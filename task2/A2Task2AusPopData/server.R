#
# This is the server logic of a Shiny web application. You can run the
# application by clicking 'Run App' above.
#
# Find out more about building applications with Shiny here:
#
#    http://shiny.rstudio.com/
#

library(shiny)
require(ggplot2)
require(plotly)
require(readxl)
require(reshape2)
require(dplyr)



### Functions
getTimeSeriesData <- function() {
    # This function gets the population data from the original file and reformats it in a way that's suitable for a line plot.
    
    # Read in the excel file.
    orig_ <-
        readxl::read_excel("Programming Profolio Task 2 Data.xlsx")
    cln_ <- orig_[1:9, 1:14]
    # Get rid of the NA column just before the end.
    cln_ <- cln_[, -13]
    
    # We should reshape this data into a more "logical" format.
    # Lets first make two context files. Since area doesn't really make sense in a population context.
    
    pop_ <- cln_[, 1:12]
    
    # Lets transform and reshape the data to something that we can work with.
    pop_t <- t(pop_)
    
    colnames(pop_t) <- pop_t[1, ]
    
    pop_t <- pop_t[-1, ]
    
    pop_melt <- melt(pop_t)
    
    colnames(pop_melt) <- c("YEAR", "GEO_GROUP", "POPULATION")
    
    pop_melt$POPULATION <- as.character(pop_melt$POPULATION)
    
    pop_melt$POPULATION <- trimws(pop_melt$POPULATION)
    
    pop_melt$POPULATION <- as.numeric(pop_melt$POPULATION)
    
    # Subset out the australian population.
    pop_melt <- pop_melt[pop_melt$GEO_GROUP != 'TOTAL AUSTRALIA', ]
    
    return (pop_melt)
}

getScatterPlotData <- function() {
    # This function gets data from the origian file and structures it in a way that can be scatter plotted.
    
    # Read in the excel file.
    orig_ <-
        readxl::read_excel("Programming Profolio Task 2 Data.xlsx")
    cln_ <- orig_[1:9, 1:14]
    # Get rid of the NA column just before the end.
    cln_ <- cln_[, -13]
    
    # We should reshape this data into a more "logical" format.
    # Lets first make two context files. Since area doesn't really make sense in a population context.
    
    pop_ <- cln_[, 1:12]
    
    pop_t <- t(pop_)
    
    rownames(pop_t) <- NULL
    
    colnames(pop_t) <- pop_t[1, ]
    pop_t <- pop_t[-1, ]
    
    pop_t <- apply(pop_t, 2, as.numeric)
    
    pop_t <- as.data.frame(pop_t)
    return (pop_t)
}

getTimeSeriesScatterData <- function(){
    # This function gets data from the origian file and structures it in a way that can be scatter plotted.
    
    # Read in the excel file.
    orig_ <-
        readxl::read_excel("Programming Profolio Task 2 Data.xlsx")
    cln_ <- orig_[1:9, 1:14]
    # Get rid of the NA column just before the end.
    cln_ <- cln_[, -13]
    
    # We should reshape this data into a more "logical" format.
    # Lets first make two context files. Since area doesn't really make sense in a population context.
    
    pop_ <- cln_[, 1:12]
    
    pop_t <- t(pop_)
    
    pop_t <- as.data.frame(pop_t)
    
    pop_t <- tibble::rownames_to_column(as.data.frame(pop_t),"YEAR")
    
    # colnames(pop_t) <- pop_t[1, ]
    # pop_t <- pop_t[-1, ]
    
    pop_t <- apply(pop_t, 2, as.numeric)
    
    pop_t <- as.data.frame(pop_t)
}



#####################################
######### MAIN METHOD ###############
#####################################
#####################################


# Define server logic required to draw a histogram
shinyServer(function(input, output) {
    output$distPlot <- renderPlot({
        # generate bins based on input$bins from ui.R
        x    <- faithful[, 2]
        bins <- seq(min(x), max(x), length.out = input$bins + 1)
        
        # draw the histogram with the specified number of bins
        hist(x,
             breaks = bins,
             col = 'darkgray',
             border = 'white')
        
    })
    output$TimeSeriesState <- renderPlotly({
        data_ <- getTimeSeriesData()
        plot_ly(
            data = data_,
            y = data_$POPULATION,
            x = data_$YEAR,
            color = data_$GEO_GROUP,
            mode = 'lines+markers',
            type = "scatter"
        ) %>% layout(margin = list(b = 100),
                     xaxis = list(title = ""))
    })
    output$StateWiseScatter <- renderPlotly({
        data_ <- getScatterPlotData()
        
        fit_ <-
            lm(data_[, input$SInputYAxis] ~ data_[, input$SInputXAxis])
        
        plot_ly(
            data = data_,
            y = data_[, input$SInputYAxis],
            x = data_[, input$SInputXAxis],
            mode = 'markers',
            type = "scatter",
            name = "Value"
        ) %>% layout(
            xaxis = list(title = input$SInputXAxis),
            yaxis = list(title = input$SInputYAxis)
        ) %>% add_trace(
            data = data_,
            x = data_[, input$SInputXAxis],
            y = fitted(fit_),
            mode = "lines" ,
            name = paste(
                "Regression Rsq ::" ,
                round(summary(fit_)$r.squared, digits = 3)
            )
        )
        
    })
    
    output$TimeWiseScatter <- renderPlotly({
        data_ <- getTimeSeriesScatterData()
        
        fit_ <- lm(data_[,input$SInputStateSelect] ~ data_$YEAR)
        
    })
    
})
