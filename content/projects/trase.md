---
title:        Trase
short_title:  Trase
summary:      Tracing the international flow of agricultural commodities
description:  "A tool that brings unprecedented transparency to commodity supply chains"
fb_title:     "trase | Transparency for sustainable economies"
fb_description: "Helping people understand and address the social and environmental impacts of their supply chains"
link:         http://trase.earth/
link_short:   trase.earth
client:       Stockholm Environment Institute
client_logo:  sei.png
svg_logo:     sei_white.png
post_url:     https://medium.com/vizzuality-blog/tracing-the-flow-of-coffee-and-soy-85d0b346c4d0#.isk4ewfio
post_title:   "Tracing the international flow of forest products"
image:       trase_thumb.jpg
cover:       trase_cover.jpg
author:      Camellia Williams
date:        11/10/2016
release_date:   November 2016          
highlighted:  true
logoWidth:      125

modules:
    -   text_left:        
            title: Outstanding flexibility 
            description: D3 is an obvious choice for creating complex data visualisations and Trase uses the latest iteration of this library with a completely customised layout for the boundary-pushing sankey diagram. In just a few lines of code, D3 turned a static sankey into a fully animated visualisation of trade data. Using Redux alongside D3 helped us deal with complex interaction flows within the data and meant we could keep the entire application state— including enabled filters, selected nodes and selected regions on the map—in a simple Javascript object and open up the option to share detailed stories drawn from the data.  
            image: trase_sankey2.png

    -   text_right:
            title: Hover and click
            description: The Trase dataset is immense and the relationships between the data points are convoluted, but that doesn’t mean the user experience should be complicated. We took great care with the design of the interface, incorporating simple hover and click interactions so users can perform complex filters on the sankey that help them draw insights. In just two clicks, it’s possible to compare multiple geospatial indicators on the map as the website automatically changes between single value and bivariate choropleths. To maximise the use of space, we doubled up the main title on the data visualisation page as a geospatial and temporal filter for the data. 
            image: trase_filters.png
---
Many of us can’t start the day without a coffee but how often do we stop to consider the journey the elixir in our mug took to get there? Where did it come from? Was the coffee harvested sustainably? Who shipped it here? Trase is a platform that lays bare the flow of coffee and other commodities—like soy and palm oil—through the global trade system. Developed by the Stockholm Environment Institute and Global Canopy Programme, Trase offers unprecedented transparency into commodity supply chains. It aims to help companies, financial institutions and governments understand and address the social and environmental impacts associated with their supply chains.


At the heart of Trase is a beautiful, interactive sankey diagram that visualises your coffee’s journey. The datasets that feed this visualisation are immense and we had to resist the urge to cram in as many features as possible. Instead, we carefully selected features that would allow people to explore the complex relationships between the data points without being overwhelmed. Pushing technology to the limits, the sankey diagram is the perfect way to fully appreciate the global demand for forest products.
