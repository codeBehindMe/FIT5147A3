require(ggplot2)
require(plotly)
require(readxl)
require(reshape2)





getStates <- function(includeTotal=TRUE){
    
    # This returns a data frame of states.
    orig_ <- readxl::read_excel("Programming Profolio Task 2 Data.xlsx")
    cln_ <- orig_[1:9,1:14]
    # Get rid of the NA column just before the end.
    cln_ <- cln_[,-13]
    
    state_ <- as.data.frame(cln_[,1])
    
    # colnames(state_) <- NULL
    
    if(includeTotal){
        return (state_)
    } else{
        return(state_[-nrow(state),])
    }
}

states_ <- getStates()
