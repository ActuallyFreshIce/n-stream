window.__CONFIG__ = {
  // The URL for the CORS proxy, the URL must NOT end with a slash!
  // If not specified, the onboarding will not allow a "default setup". The user will have to use the extension or set up a proxy themselves
  VITE_CORS_PROXY_URL: "https://proxy.nautics.cc,|type=api|https://stream.nautics.cc",

  // The READ API key to access TMDB
  VITE_TMDB_READ_API_KEY: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzRmMzllOGQyYjRlYTNjMzYwN2YyMTc4NmFkYjNiYyIsIm5iZiI6MTcyNTk0NjMwNi4wMzUsInN1YiI6IjY2ZGZkOWMyMDAwMDAwMDAwMDU4ODVlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hrOK8jeDpMiEb5deuOOEhOHdekMaVeqTufPQNfK0F5E",

  // The DMCA email displayed in the footer, null to hide the DMCA link
  VITE_DMCA_EMAIL: "support@nautics.cc",

  // Whether to disable hash-based routing, leave this as false if you don't know what this is
  VITE_NORMAL_ROUTER: true,

  // The backend URL to communicate with
  VITE_BACKEND_URL: "https://stream.nautics.cc/",

  // A comma separated list of disallowed IDs in the case of a DMCA claim - in the format "series-<id>" and "movie-<id>"
  VITE_DISALLOWED_IDS: ""
};
