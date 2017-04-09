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
    
    cNames <- c("YEAR",as.vector(unlist(pop_t[1,])))
    
    pop_t <- tibble::rownames_to_column(as.data.frame(pop_t),"YEAR")
    colnames(pop_t) <- cNames
    pop_t <- pop_t[-1, ]
    
    pop_t <- apply(pop_t, 2, as.numeric)
    
    pop_t <- as.data.frame(pop_t)
}


getMapData <- function(){
    # This function gets the data for the map
    
    
    # Read in the excel file.
    orig_ <-
        readxl::read_excel("Programming Profolio Task 2 Data.xlsx")
    cln_ <- orig_[1:9, 1:14]
    # Get rid of the NA column just before the end.
    cln_ <- cln_[, -13]
    
    # We should reshape this data into a more "logical" format.
    # Lets first make two context files. Since area doesn't really make sense in a population context.
    
    pop_ <- cln_[, 1:13]
    
    area_ <- unlist(cln_[,ncol(cln_)])
    names(area_) <- NULL
    pop_ <- as.matrix(cln_[,1:12])
    
    # Rescale to get pop density
    # pop_mtx <- sweep(pop_,MARGIN = 2,area_,FUN = "/")
    
    for(i in 1:ncol(pop_)){
      if(i != 1){
        # for(r in 1:nrow(pop_)){
        #   pop_[r,i] <- pop_[r,i]/area_[r]
        # }
        pop_[,i] <- as.numeric(pop_[,i])/area_
      }
    }
    
    # pop_mtx <- pop_
    
    # cbind colnames
    # pop_mtx <- as.data.frame(pop_mtx)
    # pop_t <- cbind(pop_[,1],pop_mtx)
    pop_ <- as.data.frame(pop_)
    pop_[,2:ncol(pop_)] <- sapply(pop_[,2:ncol(pop_)],as.character)
    pop_[,2:ncol(pop_)] <- sapply(pop_[,2:ncol(pop_)],as.double)
    colnames(pop_) <- c("NAME_1",seq(2005,2015,1))
    # # pop_t[,1] <- c("NSW","VIC","QLD","SA","WA","TAS","NT","ACT","AUS")
    # 
    # pop_t <- pop_t[-nrow(pop_t),]
    
    return (pop_)
}
