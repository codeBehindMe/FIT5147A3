# Read in the melted data for imputation.
dt_ <- read.csv("a1_data_melted.csv")

# Subset complete cases for model trainnig
cc_ <-dt_[complete.cases(dt_),]
# Subset the missing values for prediction
mis_ <- dt_[!complete.cases(dt_),]

# Check out the str
str(cc_)


# Let's do multiple linear regression for imputation, let's not waste too much time.
mdl_ <- lm(bpercent ~ ., data = cc_)


# Predict some stuff
mis_$bpercent <- predict(mdl_,mis_[,-ncol(mis_)])

tot_ <- rbind(cc_,mis_)

rownames(tot_) <- NULL

max(tot_$bpercent)


write.csv(tot_,"a1_imputed.csv",row.names = )
