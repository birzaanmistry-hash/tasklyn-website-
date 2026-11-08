/**
 * Contact details, founders and the booking link.
 * Carried over from tasklyn.in unchanged. All other site copy lives in
 * src/lib/site.ts.
 */

/**
 * The Google Calendar booking page for the Tasklyn discovery call.
 *
 * This is the canonical public URL the calendar.app.google short link resolves
 * to. It deliberately does NOT contain the /u/0/ account-index segment: that
 * form of the URL only resolves for whoever is signed into the owning Google
 * account, and would fail for most visitors.
 */
export const BOOKING_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ17Jevq0QKNWSBWPoE8hVw5XKa_lWSt9HSVvA2PGAPofY303rhof04xgj-NoRpfuHkQ5OIkMQTF";

export const BOOKING_DETAIL = "45 minutes, on Google Meet.";

export const CONTACT = {
  email: "tasklynai@gmail.com",
  instagram: { handle: "@tasklyn.ai", url: "https://instagram.com/tasklyn.ai" },
  city: "Mumbai, India",
  reach: "Working with clients anywhere.",
  founders: [
    {
      name: "Birzaan Mistry",
      role: "Co-founder",
      line: "Runs discovery and system architecture.",
      phone: "+91 99302 26026",
      tel: "+919930226026",
      whatsapp: "919930226026",
      linkedin: "https://www.linkedin.com/in/birzaan-mistry-0b5a36387/",
    },
    {
      name: "Mustafa Kapadia",
      role: "Co-founder",
      line: "Runs delivery and client operations.",
      phone: "+91 89280 67693",
      tel: "+918928067693",
      whatsapp: "918928067693",
      linkedin: "https://www.linkedin.com/in/mustafa-kapadia-14b2a135b/",
    },
  ],
};
