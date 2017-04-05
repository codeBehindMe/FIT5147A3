# Reading shape files

require(maptools)
require(RColorBrewer)
require(ggmap)

area_ <- readShapePoly("./AU-Shapefile/AUS_adm1.shp")
clrs_ <- brewer.pal(9,"BuGn")

mapImage <- get_map(location = "Australia",color = "color",source = "google", zoom = 4)
ggmap(mapImage)
