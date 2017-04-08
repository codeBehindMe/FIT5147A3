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
source("serverSideMethods.R")

### Functions





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
        ) %>% layout(showlegend = FALSE)
        
    })
    
    output$TimeWiseScatter <- renderPlotly({
        data_ <- getTimeSeriesScatterData()
        
        fit_ <- lm(data_[, input$SInputStateSelect] ~ data_$YEAR)
        
        plot_ly(
            data = data_,
            x = data_$YEAR,
            y = data_[, input$SInputStateSelect],
            mode = "markers",
            type = "scatter"
        ) %>% layout(xaxis = list(title = "Year"),
                     yaxis = list(title = "Population")) %>% add_trace(
                         data = data_,
                         x = data_$YEAR,
                         y = fitted(fit_),
                         mode = "lines"
                     ) %>% layout(showlegend = FALSE)
    })
    
})
