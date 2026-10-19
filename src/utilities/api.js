import api from "@/config/api";

// In-flight request deduplication and memory cache
const cache = new Map();
const inFlightRequests = new Map();

/**
 * Deduplicates concurrent requests to the same endpoint and caches the result for a given TTL.
 * @param {string} key - Cache key
 * @param {Function} fetcher - Function returning a Promise
 * @param {number} [ttlMs=30000] - Time to live in milliseconds
 * @param {boolean} [forceRefresh=false] - If true, bypasses cache
 */
export const dedupeRequest = async (key, fetcher, ttlMs = 30000, forceRefresh = false) => {
    if (!forceRefresh) {
        const cached = cache.get(key);
        if (cached && Date.now() - cached.timestamp < ttlMs) {
            return cached.data;
        }
        if (inFlightRequests.has(key)) {
            return inFlightRequests.get(key);
        }
    }

    const promise = (async () => {
        try {
            const data = await fetcher();
            cache.set(key, { data, timestamp: Date.now() });
            return data;
        } finally {
            inFlightRequests.delete(key);
        }
    })();

    inFlightRequests.set(key, promise);
    return promise;
};

export const clearApiCache = (keyPrefix = "") => {
    if (!keyPrefix) {
        cache.clear();
        return;
    }
    for (const key of cache.keys()) {
        if (key.startsWith(keyPrefix)) {
            cache.delete(key);
        }
    }
};

// ============================================================================
// COURSES APIS
// ============================================================================

/**
 * Fetch all active courses.
 * @param {Object} [params] - Optional query parameters, e.g. { status: true }
 * @param {Object} [options] - Cache options { forceRefresh: boolean }
 */
export const fetchCourses = async (params = {}, options = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/api/get-courses?${queryString}` : "/api/get-courses";
    const cacheKey = `GET:${endpoint}`;

    return dedupeRequest(
        cacheKey,
        async () => {
            const response = await api.get(endpoint);
            return response.data;
        },
        30000,
        options.forceRefresh
    );
};

/**
 * Fetch a single course by its numeric ID.
 * @param {string|number} id - Course ID
 * @param {Object} [options] - Cache options { forceRefresh: boolean }
 */
export const fetchCourseById = async (id, options = {}) => {
    if (!id) throw new Error("Course ID is required");
    const endpoint = `/api/get-course/${id}`;
    const cacheKey = `GET:${endpoint}`;

    return dedupeRequest(
        cacheKey,
        async () => {
            const response = await api.get(endpoint);
            return response.data;
        },
        30000,
        options.forceRefresh
    );
};

/**
 * Apply for a course. Supports both POST /api/apply-course and fallback to /api/add-course-application.
 * @param {Object} payload - Application details { name, email, phone, courseID, classID, type, gender, education_level, current_occupation }
 */
export const applyCourse = async (payload) => {
    try {
        const response = await api.post("/api/apply-course", payload);
        return response.data;
    } catch (error) {
        // Fallback to /api/add-course-application if /api/apply-course is not deployed on backend
        if (error.response?.status === 404) {
            const fallbackResponse = await api.post("/api/add-course-application", payload);
            return fallbackResponse.data;
        }
        throw error;
    }
};

export const addCourseApplication = applyCourse;

// ============================================================================
// COURSE MODULE APIS (Curriculum, Software, For Whom, Benefits, Projects, Jobs)
// Defined for centralized management as specified in the collection.
// (Not used in UI where intentional static preview is preserved)
// ============================================================================

// --- Curriculum ---
export const fetchCurriculums = async (options = {}) => {
    return dedupeRequest("GET:/api/get-curriculums", async () => {
        const response = await api.get("/api/get-curriculums");
        return response.data;
    }, 30000, options.forceRefresh);
};

export const fetchCurriculumById = async (id) => {
    const response = await api.get(`/api/get-curriculum/${id}`);
    return response.data;
};

export const addCurriculum = async (payload) => {
    const response = await api.post("/api/add-curriculum", payload);
    return response.data;
};

export const updateCurriculum = async (id, payload) => {
    const response = await api.put(`/api/update-curriculum/${id}`, payload);
    return response.data;
};

export const updateCurriculumStatus = async (id, status) => {
    const response = await api.put(`/api/update-curriculum-status/${id}`, { status });
    return response.data;
};

export const deleteCurriculum = async (id) => {
    const response = await api.delete(`/api/delete-curriculum/${id}`);
    return response.data;
};

// --- Course Software ---
export const fetchCourseSoftwares = async (options = {}) => {
    return dedupeRequest("GET:/api/get-course-softwares", async () => {
        const response = await api.get("/api/get-course-softwares");
        return response.data;
    }, 30000, options.forceRefresh);
};

export const fetchCourseSoftwareById = async (id) => {
    const response = await api.get(`/api/get-course-software/${id}`);
    return response.data;
};

export const addCourseSoftware = async (formDataOrData) => {
    const response = await api.post("/api/add-course-software", formDataOrData);
    return response.data;
};

export const updateCourseSoftware = async (id, formDataOrData) => {
    const response = await api.put(`/api/update-course-software/${id}`, formDataOrData);
    return response.data;
};

export const updateCourseSoftwareStatus = async (id, status) => {
    const response = await api.put(`/api/update-course-software-status/${id}`, { status });
    return response.data;
};

export const deleteCourseSoftware = async (id) => {
    const response = await api.delete(`/api/delete-course-software/${id}`);
    return response.data;
};

// --- Course For Whom ---
export const fetchCourseForWhoms = async (options = {}) => {
    return dedupeRequest("GET:/api/get-course-for-whoms", async () => {
        const response = await api.get("/api/get-course-for-whoms");
        return response.data;
    }, 30000, options.forceRefresh);
};

export const fetchCourseForWhomById = async (id) => {
    const response = await api.get(`/api/get-course-for-whom/${id}`);
    return response.data;
};

export const addCourseForWhom = async (formDataOrData) => {
    const response = await api.post("/api/add-course-for-whom", formDataOrData);
    return response.data;
};

export const updateCourseForWhom = async (id, formDataOrData) => {
    const response = await api.put(`/api/update-course-for-whom/${id}`, formDataOrData);
    return response.data;
};

export const updateCourseForWhomStatus = async (id, status) => {
    const response = await api.put(`/api/update-course-for-whom-status/${id}`, { status });
    return response.data;
};

export const deleteCourseForWhom = async (id) => {
    const response = await api.delete(`/api/delete-course-for-whom/${id}`);
    return response.data;
};

// --- Course Benefits ---
export const fetchCourseBenefits = async (options = {}) => {
    return dedupeRequest("GET:/api/get-course-benefits", async () => {
        const response = await api.get("/api/get-course-benefits");
        return response.data;
    }, 30000, options.forceRefresh);
};

export const fetchCourseBenefitById = async (id) => {
    const response = await api.get(`/api/get-course-benefit/${id}`);
    return response.data;
};

export const addCourseBenefit = async (formDataOrData) => {
    const response = await api.post("/api/add-course-benefit", formDataOrData);
    return response.data;
};

export const updateCourseBenefit = async (id, formDataOrData) => {
    const response = await api.put(`/api/update-course-benefit/${id}`, formDataOrData);
    return response.data;
};

export const deleteCourseBenefit = async (id) => {
    const response = await api.delete(`/api/delete-course-benefit/${id}`);
    return response.data;
};

// --- Course Projects ---
export const fetchCourseProjects = async (options = {}) => {
    return dedupeRequest("GET:/api/get-course-projects", async () => {
        const response = await api.get("/api/get-course-projects");
        return response.data;
    }, 30000, options.forceRefresh);
};

export const fetchCourseProjectById = async (id) => {
    const response = await api.get(`/api/get-course-project/${id}`);
    return response.data;
};

export const addCourseProject = async (formDataOrData) => {
    const response = await api.post("/api/add-course-project", formDataOrData);
    return response.data;
};

export const updateCourseProject = async (id, formDataOrData) => {
    const response = await api.put(`/api/update-course-project/${id}`, formDataOrData);
    return response.data;
};

export const updateCourseProjectStatus = async (id, status) => {
    const response = await api.put(`/api/update-course-project-status/${id}`, { status });
    return response.data;
};

export const deleteCourseProject = async (id) => {
    const response = await api.delete(`/api/delete-course-project/${id}`);
    return response.data;
};

// --- Course Job Positions ---
export const fetchCourseJobPositions = async (options = {}) => {
    return dedupeRequest("GET:/api/get-course-job-positions", async () => {
        const response = await api.get("/api/get-course-job-positions");
        return response.data;
    }, 30000, options.forceRefresh);
};

export const fetchCourseJobPositionById = async (id) => {
    const response = await api.get(`/api/get-course-job-position/${id}`);
    return response.data;
};

export const addCourseJobPosition = async (formDataOrData) => {
    const response = await api.post("/api/add-course-job-position", formDataOrData);
    return response.data;
};

export const updateCourseJobPosition = async (id, formDataOrData) => {
    const response = await api.put(`/api/update-course-job-position/${id}`, formDataOrData);
    return response.data;
};

export const updateCourseJobPositionStatus = async (id, status) => {
    const response = await api.put(`/api/update-course-job-position-status/${id}`, { status });
    return response.data;
};

export const deleteCourseJobPosition = async (id) => {
    const response = await api.delete(`/api/delete-course-job-position/${id}`);
    return response.data;
};

// ============================================================================
// HOME & GLOBAL WEBSITE APIS (Deduplicated to fix multiple redundant calls)
// ============================================================================

/**
 * Fetch home page content, metadata, social links, and popup info.
 * Deduplicates in-flight calls from OfferPopup, TimeSwitcher, SocialLink, OverViews.
 */
export const fetchHome = async (options = {}) => {
    return dedupeRequest(
        "GET:/api/get-home",
        async () => {
            const response = await api.get("/api/get-home");
            return response.data;
        },
        60000,
        options.forceRefresh
    );
};

/**
 * Fetch office locations.
 */
export const fetchOffices = async (config = {}, options = {}) => {
    const cacheKey = "GET:/api/get-offices";
    return dedupeRequest(
        cacheKey,
        async () => {
            const response = await api.get("/api/get-offices", config);
            return response.data;
        },
        60000,
        options.forceRefresh
    );
};

// ============================================================================
// SERVICES & CAREERS
// ============================================================================

/**
 * Fetch services filtered by index.
 * @param {string} [index=""] - Service index (e.g. 'contact-service', 'courses-service', 'hire-developer-service')
 */
export const fetchServices = async (index = "", options = {}) => {
    const endpoint = index ? `/api/get-services?index=${index}` : "/api/get-services";
    const cacheKey = `GET:${endpoint}`;

    return dedupeRequest(
        cacheKey,
        async () => {
            const response = await api.get(endpoint);
            return response.data;
        },
        30000,
        options.forceRefresh
    );
};

/**
 * Fetch career openings.
 */
export const fetchCareers = async (options = {}) => {
    return dedupeRequest(
        "GET:/api/get-careers",
        async () => {
            const response = await api.get("/api/get-careers");
            return response.data;
        },
        30000,
        options.forceRefresh
    );
};

/**
 * Fetch employees for the hiring/developer section.
 */
export const fetchEmployees = async (options = {}) => {
    return dedupeRequest(
        "GET:/api/get-employees",
        async () => {
            const response = await api.get("/api/get-employees");
            return response.data;
        },
        30000,
        options.forceRefresh
    );
};

/**
 * Submit employee hire request.
 */
export const hireEmployee = async (payload) => {
    const response = await api.post("/api/hire-employee", payload);
    return response.data;
};

// ============================================================================
// BLOGS & COMMENTS
// ============================================================================

export const fetchBlogs = async (options = {}) => {
    return dedupeRequest(
        "GET:/api/get-blogs",
        async () => {
            const response = await api.get("/api/get-blogs");
            return response.data;
        },
        30000,
        options.forceRefresh
    );
};

export const fetchCommentsByBlog = async (blogId, isApproved = true) => {
    const response = await api.get(`/api/get-comments-by-blog/${blogId}?isApproved=${isApproved}`);
    return response.data;
};

export const addComment = async (payload, config = {}) => {
    const response = await api.post("/api/add-comment", payload, config);
    return response.data;
};

// ============================================================================
// CONTACT & INQUIRIES
// ============================================================================

/**
 * Submit a contact inquiry. Handles both FormData / URLSearchParams and JSON.
 */
export const addContact = async (payload, config = {}) => {
    const headers = { ...config.headers };
    if (payload instanceof URLSearchParams) {
        headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    const response = await api.post("/api/add-contact", payload, {
        ...config,
        headers,
    });
    return response.data;
};

// ============================================================================
// CASE STUDIES & EXPERTISES
// ============================================================================

export const fetchCaseStudies = async (options = {}) => {
    return dedupeRequest(
        "GET:/api/get-case-studies",
        async () => {
            try {
                const response = await api.get("/api/get-case-studies");
                return response.data;
            } catch (error) {
                console.error("Error fetching case studies:", error);
                return { status: 500, message: "Error fetching case studies", caseStudies: [] };
            }
        },
        60000,
        options.forceRefresh
    );
};

export const fetchExpertises = async (options = {}) => {
    return dedupeRequest(
        "GET:/api/get-expertises",
        async () => {
            try {
                const response = await api.get("/api/get-expertises");
                return response.data;
            } catch (error) {
                console.error("Error fetching expertises:", error);
                return { status: 500, message: "Error fetching expertises", expertises: [] };
            }
        },
        60000,
        options.forceRefresh
    );
};

export const fetchCaseStudyResolutions = async (options = {}) => {
    return dedupeRequest(
        "GET:/api/get-case-study-resolutions",
        async () => {
            try {
                const response = await api.get("/api/get-case-study-resolutions");
                return response.data;
            } catch (error) {
                console.error("Error fetching case study resolutions:", error);
                return { status: 500, message: "Error fetching case study resolutions", resolutions: [] };
            }
        },
        60000,
        options.forceRefresh
    );
};

// ============================================================================
// ANALYTICS
// ============================================================================

export const trackVisitor = async (payload = {}, config = {}) => {
    const response = await api.post("/api/analytics/track-visitor", payload, config);
    return response.data;
};

// ============================================================================
// LIVE CHAT APIS
// ============================================================================

export const fetchChatMessages = async (email, page = 1, limit = 100) => {
    const response = await api.get(`/api/get-messages?email=${encodeURIComponent(email)}&page=${page}&limit=${limit}`);
    return response.data;
};

export const fetchChatUnreadCount = async (email) => {
    const response = await api.get(`/api/get-unread-count?email=${encodeURIComponent(email)}`);
    return response.data;
};

export const markChatUserRead = async (email) => {
    const response = await api.put("/api/read-user", { email });
    return response.data;
};

export const sendChatMessage = async (formData) => {
    const response = await api.post("/api/send-message", formData);
    return response.data;
};
