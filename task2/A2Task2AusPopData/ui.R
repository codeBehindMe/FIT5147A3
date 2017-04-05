#
# This is the user-interface definition of a Shiny web application. You can
# run the application by clicking 'Run App' above.
#
# Find out more about building applications with Shiny here:
#
#    http://shiny.rstudio.com/
#

library(shiny)
require(shinydashboard)
require(plotly)
# Define UI for application that draws a histogram
# shinyUI(fluidPage(
#
#   # Application title
#   titlePanel("Old Faithful Geyser Data"),
#
#   # Sidebar with a slider input for number of bins
#   sidebarLayout(
#     sidebarPanel(
#        sliderInput("bins",
#                    "Number of bins:",
#                    min = 1,
#                    max = 50,
#                    value = 30)
#     ),
#
#     # Show a plot of the generated distribution
#     mainPanel(
#        plotOutput("distPlot")
#     )
#   )
# ))


dashboardPage(
    dashboardHeader(title = "Australian Population Dashboard"),
    dashboardSidebar(menuItem(
        "Dashboard",
        tabName = "Dashboard",
        icon = icon("dashboard")
    )),
    dashboardBody(fluidRow(
        box(
            title = "Time series Population Growth",
            solidHeader = TRUE,
            status = "primary",
            width = NULL,
            plotlyOutput("TimeSeriesState")
        )
    ), fluidRow(
        column(width = 6,
            box(
                title = "State Growth Scatter",
                solidHeader = TRUE,
                width = NULL,
                status = "primary",
                selectInput(inputId="SInputYAxis",choices=states_,label="Y-Axis"),
                       selectInput(inputId="SInputXAxis",choices=states_,label="X-Axis"),
                plotlyOutput("StateWiseScatter")
                
            )
        ),
        column(width = 6,
               box(
                   title = "State Growth Comparison",
                   solidHeader = TRUE,
                   width = NULL,
                   status = "primary",
                   selectInput(inputId="SInputStateSelect",choices=states_,label="Select State")
               )
        )
    ))
)
