---
title:	Visualizing the impact of sea level rise on coastal cities
date:	2014-12-12
author:	Jamie
---

![See the impact of sea level rise in 4 cities](/assets/images/posts/49_a.png)
[Click here](http://vizzuality.github.io/sea-level-lab/) to see our data experiment on sea level rise in 5 coastal cities.

At Vizzuality we like to make visualizations that tell important stories. For the last two weeks, an important story across the globe has been the latest round of negotiations on the global response to climate change. In Lima, thousands of delegates and negotiators from national governments, NGOs and intergovernmental organisations have been setting the ground for an ambitious new climate treaty, to be signed next year in Paris, which will set the global agenda for curbing emissions of greenhouse gases and adapting to the impacts of climate change.

As the resident data scientist, I wanted to experiment with different ways to show the potential impact of sea level rise. After talking to [Jamie](http://www.vizzuality.com/team/jamie), our social scientist, we decided to use San Francisco as our test case; it’s coastal, it’s well known and a bunch of data detailing the elevation of the city was easily accessible. I started by generating the polygons between isotherms using the 30m resolution DEMs, to show the area at risk of flooding, but it wasn’t as precise as I wanted, and there were a number of issues with the ‘original’ (i.e. present) coastline in elevation models not necessarily following the actual coastline.

I then decided to use a 1 m resolution DEMs provided by the NOAA coastline project, to overcome these issues. I was much happier with the results, so started looking for other cities with this data, which led to the five examples [on this page](http://vizzuality.github.io/sea-level-lab/): San Francisco, Boston, Aarhus, San Sebastian and Barcelona. These maps show what could happen for these cities under different sea level rise scenarios, assuming no change in elevation due to accretion or subsidence and no new sea level defences. 

Jamie and I did try to find data for other cities as well, but it turns out high quality, accurate DEMs are quite hard to find and access freely. I tried Miami next; it took quite a while to find good quality data and, even though I did manage to find a decent dataset after a few days looking in different places, it still wasn’t good enough. However our search was much harder for a number of European cities, including Venice and Marseille, as well as a number of locations across South America and Africa, which meant we did not manage to gain access to the DEMs necessary.

The heterogeneity of the data I did find was also surprising. In San Francisco, the contours on the DEM we used were 1 m apart, but for Aarhus they were 0.5 m apart. This has obvious impacts for what can be done with the data (i.e. we couldn’t investigate sub-metre intervals of sea level rise), and how the results will come out.

Sea level changes are likely to affect everyone in some way as it causes, amongst other things, large population movements, loss of homes, offices and factories and changes to soil and water salinity. We think stories like this need to reach new populations, but we won’t be able to tell these stories effectively if it’s difficult to access accurate data and science. My recommendations to make it easier are:

1.  Governments could make their data *even* more open (i.e. free and quickly available at the point of access)
2.  Governments and other organisations could make it easier to discover information by using simpler interfaces with their data
3.  DEMs needs to be collected and stored more consistently
4.  The data and models behind some analyses are difficult to discover or use, especially for non-technical users; this could be made easier.

Hope you like it!

[Alicia](http://www.vizzuality.com/team/alicia)
