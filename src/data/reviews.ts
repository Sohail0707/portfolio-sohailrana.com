export interface Review {
  text: string;
  name: string;
  project: string;
}

/** Real client reviews from Upwork work history. */
export const reviews: Review[] = [
  {
    text: "I had an absolutely fantastic experience working with Sohail on my website. From the very beginning, Sohail took the time to truly understand my brand.",
    name: "Seetha The Comic",
    project: "Brand site rebuild",
  },
  {
    text: "Sohail was attentive and delivered exactly what I needed within the required timeframe. I highly recommend him for his professionalism and high-quality work.",
    name: "Upwork client",
    project: "JavaScript carousel",
  },
  {
    text: "What a great website! Really beautiful and hit a lot of details and content. Also easy to work with. Thanks so much!",
    name: "Local business owner",
    project: "Business website",
  },
  {
    text: "Did a great looking website, thanks so much!",
    name: "Service company owner",
    project: "Marketing site",
  },
];
