## 

library(maps)
library(mapdata)
library(sp)
require(plyr)
source("serverSideMethods.R")
require(rgdal)
require(leaflet)


aus<-map("worldHires", "Australia", fill=TRUE, xlim=c(110,160),
         ylim=c(-45,-5), mar=c(0,0,0,0))


library(shapefiles)


aus_shp <- readShapeSpatial("AUS_adm1.shp")
plot(aus_shp)


mapD_ <- getMapData()


m_ <- merge(aus_shp,mapD_,by="NAME_1")



shp_df <- fortify(aus_shp)

map <- ggplot() +
  geom_path(data = shp_df, 
            aes(x = long, y = lat, group = group)) + geom_polygon(aes(x = shp_df$long,y = shp_df$lat, fill = 'blue'))



muni <- readShapeSpatial("AUS_adm1.shp")

muni@data$id <- rownames(muni@data)

muni.df <- fortify(muni)
muni.df <- merge(muni.df,muni@data,by = "id")
muni.df <- merge(muni.df,mapD_,by.x = "NAME_1",by.y="NAME_1",all.x=T,all.y=F)

map <- ggplot() +
  geom_path(data = muni.df, 
            aes(x = long, y = lat, group = group)) + geom_polygon(aes(x = muni.df$long, y = muni.df$lat,fill=muni.df$`2015`))

map <- map + geom_polygon(aes(fill='blue'))

print(map)











# Using leaflet


aus_map <- readOGR(".","AUS_adm1")
pop_ <- mapD_$`2006`[match(aus_map$NAME_1,mapD_$NAME_1)]


qpal <- colorQuantile("Blues", pop_, 12)


leaflet(aus_map) %>% addTiles() %>% addPolygons(stroke = F, smoothFactor = 0.2, fillOpacity=1,color = qpal(pop_))

# Using leaflet

aus_map <- readOGR(".","AUS_adm1")

dt_ <- getMapData()
dt_[,2:ncol(dt_)] <- sapply(dt_[,2:ncol(dt_)],as.character)
dt_[,2:ncol(dt_)] <- sapply(dt_[,2:ncol(dt_)],as.double)

var_ <- dt_[,3][match(aus_map$NAME_1,dt_$NAME_1)]
var_qpal <- colorQuantile("Blues", var_, 9)

leaflet(aus_map) %>% addTiles() %>% addPolygons(stroke = F, smoothFactor = 0.2, fillOpacity=1,color = qpal(var_))

