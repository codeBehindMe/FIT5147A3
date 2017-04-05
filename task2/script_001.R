## Assignment 3 Task 2 ##
require(readxl)
require(ggplot2)
require(reshape2)
require(plotly)

# Read in the excel file.
orig_ <- readxl::read_excel("Programming Profolio Task 2 Data.xlsx")

# Look at the sahpe
dim(orig_)

# clearly too big. Look at the head
head(orig_)

# Hmm looks like a lot of NA columns as well as two additional rows.
# Lets get rid of them.

cln_ <- orig_[1:9,1:14]
# Get rid of the NA column just before the end.
cln_ <- cln_[,-13]

# We should reshape this data into a more "logical" format.
# Lets first make two context files. Since area doesn't really make sense in a population context.

pop_ <- cln_[,1:12]

# Lets transform and reshape the data to something that we can work with.
pop_t <- t(pop_)

colnames(pop_t) <- pop_t[1,]

pop_t <- pop_t[-1,]

pop_melt <- melt(pop_t)

colnames(pop_melt) <- c("YEAR","GEO_GROUP","POPULATION")


pop_melt$POPULATION <- as.character(pop_melt$POPULATION)

pop_melt$POPULATION <- trimws(pop_melt$POPULATION)

pop_melt$POPULATION <- as.numeric(pop_melt$POPULATION)

# Subset out the australian population.
pop_melt <- pop_melt[pop_melt$GEO_GROUP != 'TOTAL AUSTRALIA',]

ggplotly(ggplot(pop_melt,aes(x=pop_melt$YEAR,y=pop_melt$POPULATION,color=pop_melt$GEO_GROUP)) + geom_point())



