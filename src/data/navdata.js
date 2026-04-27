export const navTree = [
    {
      label: "Portfolio",
      type: "folder",
      children: [
        { label: "People", to: "/gallery/portrait" },
        { label: "Fashion", to: "/gallery/fashion" },
        { label: "Collage", to: "/gallery/collage" },
        { label: "Things", to: "/gallery/things" },
        { label: "Ambient", to: "/gallery/ambient" },
        {
          label: "Children",
          type: "folder",
          children: [
            { label: "More", to: "/gallery/portrait" },
        
            {
              label: "Experimental",
              type: "folder",
              children: [
                { label: "Ambient", to: "/gallery/ambient" },
                { label: "Collage", to: "/gallery/collage" },
              ],
            },
          ],
        }
           ]
    },
  
    {
      label: "About",
      type: "text",
      lines: [
        "Hi! I am a photographer based in London and available internationally. I approach every project at full velocity: each is an opportunity to create something unique.",
        "Bringing my technical ability to every shoot is the bare minimum: significant planning goes into the thinking behind every shoot, getting under the skin of my subject and what you wish to communicate. Tell me what is important to you and we can come up with something unique.",
        "Having studied languages at UCL, my camera has enabled me to engage my natural curiosity with my work being featured in national press and in major advertising campaigns for clients including EE and Saatchi & Saatchi.",
        "I also run a boutique creative studio building bespoke content, advertising and websites where each project is an opportunity to make something unique. Site © Isabelle Johnson newworldcreative.studio.",
      ]
    },
  
    {
      label: "Contact",
      type: "contact",
      lines: [
        "isabelle@isabellejohnsonphoto.com",
        "Instagram: issyj1",
      ],
      instagram: "https://www.instagram.com/issyj1/",
    
    },
  
    {
      label: "Reviews",
      type: "text",
      lines: [
        "Susan Hosking, Executive Creative Director International, Mother London - I always love it when Issy has come to me with ideas. She’s driven, smart and interesting, and has such a broad skillset, she can approach ideas from a variety of fresh angles to bring them to life.",
        "Lottie Sole, Senior Creative, TBWA\ Media Arts Lab Los Angeles - Issy has great creative flair and drive on every project she touches! From concepting through to execution, Issy’s wide range of skills and experience across big and small brands make her an asset to any creative brief.",
        "Sally Clark, Director of Marketing, Age UK Wandsworth — From the very first shoot Isabelle displayed a professionalism and flare for taking photographs that brought to life the brand. Isabelle has a rare quality of being reassuring and able to observe. Isabelle is able to communicate with people from a wide range of backgrounds and put people at their ease. Her photos featured on bus stop ads enabled us to beat occupancy targets for a new nursery by 225%.",
        "Aucke Paulasma, Artist - It was a real pleasure to be in front of Isabelle’s camera. She created such a relaxed and thoughtful atmosphere, and her clear vision from concept to result really came through. I'm so happy with how the photos turned out.",

      ]
    }
     
  ];