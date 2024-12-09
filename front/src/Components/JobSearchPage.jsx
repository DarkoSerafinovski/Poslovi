import React, { useState } from "react";
import axios from "axios";
import Navigation from "./Navigation";
import "./JobSearchPage.css";

const JobSearchPage = () => {
  const [country, setCountry] = useState("gb"); // Default country: United Kingdom
  const [position, setPosition] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Total pages for pagination

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/adzuna/jobs`,
        {
          params: {
            country: country,
            what: position,
            page: page,
            results_per_page: 10,
          },
        }
      );
      setJobs(response.data.results || []);
      setTotalPages(Math.ceil(response.data.count / 10)); // Assuming `count` gives total results
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page on new search
    fetchJobs();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchJobs();
  };

  return (
    <div className="job-search-page">
      <Navigation />
      <h1>Job Search</h1>
      <form onSubmit={handleSearch} className="filter-form">
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="gb">United Kingdom</option>
            <option value="us">United States</option>
            <option value="de">Germany</option>
            <option value="fr">France</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="e.g., Developer"
          />
        </div>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div>
          <div className="job-list">
            {jobs.length > 0 ? (
              jobs.map((job, index) => (
                <div key={index} className="job-card">
                  <h3>{job.title}</h3>
                  <p>
                    <strong>Company:</strong> {job.company?.display_name || "N/A"}
                  </p>
                  <p>
                    <strong>Location:</strong>{" "}
                    {job.location?.display_name || "N/A"}
                  </p>
                  <p>
                    <strong>Salary:</strong>{" "}
                    {job.salary_min && job.salary_max
                      ? `${job.salary_min} - ${job.salary_max}`
                      : "Not specified"}
                  </p>
                  <a href={job.redirect_url} target="_blank" rel="noreferrer">
                    View Details
                  </a>
                </div>
              ))
            ) : (
              <p>No jobs found. Try adjusting your filters.</p>
            )}
          </div>
          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobSearchPage;
