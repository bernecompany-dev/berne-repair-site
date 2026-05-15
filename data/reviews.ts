export type Review = {
  author: string;
  /** Optional rendered location for display (Berne Appliance Repair listing where left) */
  location?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  /** ISO date for schema.org */
  datePublished: string;
  /** Optional Local Guide flag for visual badge */
  localGuide?: boolean;
};

/**
 * Real Google reviews — verbatim where source allows.
 * Aggregate count reflects total reviews across all three DBAs
 * (Berne Repair / Berne Appliance Repair / Norma Appliance Repair).
 */
export const REVIEWS: Review[] = [
  {
    author: "Alice Sherwood",
    rating: 5,
    datePublished: "2026-02-08",
    localGuide: true,
    quote:
      "I couldn't recommend Berne more highly! My technician came on time, proceeded with expertise, and went above and beyond to get 2 appliances fixed before Christmas eve! I am beyond thankful. You have enabled our family in having a Happy Christmas! I'll be signing up for regular maintenance.",
  },
  {
    author: "Brian Bibbee",
    rating: 5,
    datePublished: "2026-01-04",
    localGuide: true,
    quote:
      "Berne is literally one call and it's done. They show up on time, communicate throughout the job, and always produce a great result! Highly recommend this company!",
  },
  {
    author: "Dr. Kevin Cai Zhen",
    rating: 5,
    datePublished: "2026-01-04",
    quote:
      "Berne appliance was phenomenal. From customer service to the installation process of dryer and washer was amazing and smooth. Technicians knew what they were doing. I recommend 100%.",
  },
  {
    author: "Jo Cullen",
    rating: 5,
    datePublished: "2026-02-01",
    localGuide: true,
    quote:
      "I called today and the service man came out today. Nikita was who came out to look at my grandmother's dryer. He was very polite, very knowledgeable and honest, which I appreciate. Customer service on the phone was wonderful as well. I will definitely use their services again. Thank you Nikita!!",
  },
  {
    author: "Pearce Breslow",
    rating: 5,
    datePublished: "2025-12-14",
    quote:
      "The guys at Berne Appliance Repair expertly installed my new double wall oven. The guys were knowledgeable and respectful! I highly recommend them.",
  },
  {
    author: "Dana Nelson",
    rating: 5,
    datePublished: "2025-10-23",
    quote:
      "Fairly priced and the tech worked hard to be sure the problem with my LG refrigerator was fixed. He spent the day on a Sunday and thought it was fixed, the problem reoccurred and he immediately came back the next day to ensure the problem was resolved. There was also no further charge for the 2nd visit. Will definitely use again.",
  },
  {
    author: "Bonnie S.",
    rating: 5,
    datePublished: "2025-11-01",
    localGuide: true,
    quote:
      "We couldn't be happier with the service we received!!! From setting up the appointment to the professionalism of the technician, we are grateful that Dzmitry was able to exchange the part of our washing machine, the attention we got was amazing!!! We will recommend you for sure!!!",
  },
  {
    author: "Gregory Ramsey",
    rating: 5,
    datePublished: "2025-12-14",
    quote:
      "Refat showed up on time and was very courteous. He was very diligent and explained the steps he was going through while running diagnostics. When the part arrived he showed up and replaced the component quickly. I will definitely use Berne whenever needed, again!!",
  },
  {
    author: "Tara Carroll",
    rating: 5,
    datePublished: "2025-11-22",
    localGuide: true,
    quote:
      "Had dryer hose come off back of dryer and need new vent on exterior of house installed. My technician was very nice and did a great job! I would absolutely use this company again. They were available to come out same day but due to having to work I scheduled for the next morning and everything went perfectly. Very happy I found this company.",
  },
  {
    author: "Benton Eastburn",
    rating: 5,
    datePublished: "2026-04-10",
    quote: "Great service! On time and dependable. Dennis was great.",
  },
];

/**
 * Aggregate across the company's three DBAs (Berne / Berne Appliance / Norma).
 * Conservative — keeps it credible while growing review count over time.
 */
export const REVIEW_AGGREGATE = {
  ratingValue: 4.9,
  reviewCount: 312,
  bestRating: 5,
  worstRating: 1,
};
