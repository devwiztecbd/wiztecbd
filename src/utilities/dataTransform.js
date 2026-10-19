// Transform API case studies data to component-compatible format
export const transformCaseStudyToProduct = (caseStudy) => {
  return {
    id: caseStudy.id,
    title: caseStudy.title,
    description: caseStudy.short_desc,
    img: caseStudy.image, // Use API image
    alt: caseStudy.title,
    buttonText: "read more",
    color: caseStudy.id % 2 === 0 ? "#c53d3d" : "#20804F", // Alternate colors
    tags: caseStudy.expertises?.map(exp => exp.name) || []
  };
};

export const transformCaseStudyToPortfolio = (caseStudy) => {
  return {
    id: caseStudy.id.toString(),
    title: caseStudy.title,
    description: caseStudy.short_desc,
    img: caseStudy.image, // Use API image
    alt: caseStudy.title,
    intro: {
      industry: caseStudy.industry,
      country: caseStudy.country,
      team: caseStudy.team_composition,
      technologies: caseStudy.expertises?.map(exp => exp.name).join(', ') || '',
      duration: parseInt(caseStudy.project_duration) || 6
    },
    companyBack: {
      id: 1,
      title: "Company Background",
      description: caseStudy.company_background,
      img: caseStudy.image, // Use API image
      alt: "company background"
    },
    problems: {
      id: 1,
      title: "The Problem",
      description: caseStudy.problem_statement,
      img: caseStudy.image, // Use API image
      alt: "problem"
    },
    projectTargets: {
      description: caseStudy.project_target || caseStudy.short_desc,
      img: caseStudy.image, // Use API image
      alt: "Project Targets"
    },
    managerStatement: {
      id: 1,
      description: caseStudy.managers_statement
    },
    projectStatement: {
      id: 1,
      title: "Product Development Project's Statement",
      description: caseStudy.managers_statement
    },
    challenges: {
      title: "Challenges Encountered",
      image: caseStudy.image, // Use API image
      list: caseStudy.challenges?.filter(challenge => challenge !== "nothing").map((challenge, index) => ({
        id: index + 1,
        content: challenge
      })) || []
    },
    resolutionOffered: {
      id: 1,
      title: "Resolutions Offered",
      description: "To address these challenges, we developed a robust and dynamic system with the following key components:",
      offers: caseStudy.resolutions?.map(resolution => ({
        id: resolution.id,
        title: resolution.title,
        description: resolution.description
      })) || []
    },
    products: caseStudy.resolutions?.slice(0, 4).map((resolution, index) => ({
      id: index + 1,
      title: resolution.title,
      description: resolution.description,
      img: caseStudy.image, // Use API image
      alt: resolution.title,
      color: index % 2 === 0 ? "#479d52" : index % 3 === 0 ? "#cd89e8" : "#20804F"
    })) || [],
    results: {
      result: [
        {
          id: "1",
          content: "Hours of Work Saved Weekly",
          value: caseStudy.hours_save || "18",
          type: "number"
        },
        {
          id: "2",
          content: "in Annual Savings",
          value: caseStudy.annual_savings || "40",
          type: "$"
        },
        {
          id: "3",
          content: "of Users Reported High Usability",
          value: caseStudy.usability_percentage || "90",
          type: "%"
        }
      ],
      list: caseStudy.results?.filter(result => result !== "nothing").map((result, index) => ({
        id: index + 1,
        content: result
      })) || []
    },
    faq: [
      {
        id: 1,
        title: "Can we customize the Project as per our requirement?",
        description: "We have a team of professionals whose high performance brings forth growth and success."
      },
      {
        id: 2,
        title: "How can we get a quotation?",
        description: "We have a team of professionals whose high performance brings forth growth and success."
      }
    ]
  };
};

export const transformCaseStudiesToProducts = (caseStudies) => {
  return caseStudies.map(transformCaseStudyToProduct);
};

export const transformCaseStudiesToPortfolio = (caseStudies) => {
  return caseStudies.map(transformCaseStudyToPortfolio);
};

export const normalizeImageUrl = (url) => {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  if (!trimmed) return "";
  const apiBase = (
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.VITE_API_BASE_URL ||
    "https://pct-pretty-sealed-consultancy.trycloudflare.com"
  ).replace(/\/+$/, "");
  let normalized = trimmed.replace(/^https?:\/\/(localhost|127\.0\.0\.1):5000/, apiBase);
  if (normalized.startsWith("/uploads/")) {
    normalized = `${apiBase}${normalized}`;
  }
  return normalized;
};

export const transformCourseData = (apiCourse, fallbackCourse = null) => {
  if (!apiCourse) return fallbackCourse;

  let parsedDays = [];
  if (Array.isArray(apiCourse.days)) {
    parsedDays = apiCourse.days;
  } else if (typeof apiCourse.days === "string") {
    try {
      const parsed = JSON.parse(apiCourse.days);
      parsedDays = Array.isArray(parsed) ? parsed : [apiCourse.days];
    } catch {
      parsedDays = apiCourse.days.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }

  const courseType = (apiCourse.type || apiCourse.course_type || "offline").toLowerCase();
  const rawPrice = apiCourse.price ? Number(String(apiCourse.price).replace(/[^0-9.]/g, "")) : null;
  const durationStr = apiCourse.duration
    ? (typeof apiCourse.duration === "number" ? `${apiCourse.duration} months` : String(apiCourse.duration))
    : "3 Months";
  const classesStr = apiCourse.classes
    ? `${apiCourse.classes} classes`
    : apiCourse.lectures
    ? `${apiCourse.lectures} classes`
    : "24 classes";
  const hoursStr = apiCourse.hour ? `${apiCourse.hour} hours` : "40 hours";
  const classDurationStr = apiCourse.class_duration || "2 hours";
  const timeStr = apiCourse.time || "7:00 PM - 9:00 PM";

  const rawImage = apiCourse.banner || apiCourse.image || apiCourse.img || fallbackCourse?.image || "";
  const resolvedImage = normalizeImageUrl(rawImage) || fallbackCourse?.image || "/assets/images/training images/multi_domain_curriculum_lab.png";

  const descriptionText = apiCourse.overview || apiCourse.description || fallbackCourse?.description || "";
  const overviewDescriptionText = apiCourse.overview_description || apiCourse.overview || descriptionText;

  let enrollmentOptions = [];

  if (Array.isArray(apiCourse.classTypes) && apiCourse.classTypes.length > 0) {
    enrollmentOptions = apiCourse.classTypes.map((ct) => {
      const mode = (ct.type || "offline").toLowerCase();
      const fallbackMode = fallbackCourse?.enrollmentOptions?.find((o) => o.id === mode);
      const isOnline = mode === "online";
      const resolvedPrice = ct.discountedPrice ?? ct.price ?? (isOnline ? 8000 : 12000);
      const formatDuration = ct.duration
        ? (typeof ct.duration === "number" ? `${ct.duration} months` : String(ct.duration))
        : (fallbackMode?.duration || "3 Months");
      const formatClasses = ct.classes
        ? (typeof ct.classes === "number" ? `${ct.classes} classes` : (String(ct.classes).includes("class") ? ct.classes : `${ct.classes} classes`))
        : (fallbackMode?.classes || "24 classes");
      const formatHours = ct.learningHours
        ? (typeof ct.learningHours === "number" ? `${ct.learningHours} hours` : (String(ct.learningHours).includes("hour") ? ct.learningHours : `${ct.learningHours} hours`))
        : (fallbackMode?.learningHours || "40 hours");
      const formatClassDuration = ct.classDuration
        ? (typeof ct.classDuration === "number" ? `${ct.classDuration} hours` : String(ct.classDuration))
        : (fallbackMode?.classDuration || "2 hours");

      return {
        id: mode,
        classTypeId: ct.id,
        label: isOnline ? "Online" : "Offline",
        description: fallbackMode?.description || (isOnline ? "Attend live from anywhere" : "Learn in our classroom"),
        price: resolvedPrice,
        originalPrice: ct.price,
        discountedPrice: ct.discountedPrice,
        duration: formatDuration,
        classes: formatClasses,
        learningHours: formatHours,
        classDuration: formatClassDuration,
        days: Array.isArray(ct.days) && ct.days.length > 0 ? ct.days : (fallbackMode?.days || (isOnline ? ["Sunday", "Monday"] : ["Sunday", "Monday", "Saturday"])),
        time: ct.time || fallbackMode?.time || timeStr,
      };
    });
  } else if (Array.isArray(apiCourse.enrollmentOptions) && apiCourse.enrollmentOptions.length > 0) {
    enrollmentOptions = apiCourse.enrollmentOptions;
  } else {
    const fallbackOnline = fallbackCourse?.enrollmentOptions?.find((o) => o.id === "online");
    const fallbackOffline = fallbackCourse?.enrollmentOptions?.find((o) => o.id === "offline");

    const defaultOnline = {
      id: "online",
      label: "Online",
      description: fallbackOnline?.description || "Attend live from anywhere",
      price: rawPrice || fallbackOnline?.price || 8000,
      duration: durationStr,
      classes: classesStr,
      learningHours: hoursStr,
      classDuration: classDurationStr,
      days: parsedDays.length > 0 ? parsedDays : (fallbackOnline?.days || ["Sunday", "Monday"]),
      time: timeStr,
    };

    const defaultOffline = {
      id: "offline",
      label: "Offline",
      description: fallbackOffline?.description || "Learn in our classroom",
      price: rawPrice || fallbackOffline?.price || 12000,
      duration: durationStr,
      classes: classesStr,
      learningHours: hoursStr,
      classDuration: classDurationStr,
      days: parsedDays.length > 0 ? parsedDays : (fallbackOffline?.days || ["Sunday", "Monday", "Saturday"]),
      time: timeStr,
    };

    if (courseType === "both" || courseType === "all") {
      enrollmentOptions = [defaultOnline, defaultOffline];
    } else if (courseType === "online") {
      enrollmentOptions = [defaultOnline, defaultOffline];
    } else {
      enrollmentOptions = [defaultOffline, defaultOnline];
    }
  }

  const primaryOption = enrollmentOptions.find((o) => o.id === courseType) || enrollmentOptions[0] || {};
  const resolvedPrice = rawPrice || primaryOption?.price || (courseType === "online" ? 8000 : 12000);
  const resolvedHours = apiCourse.hour
    ? String(apiCourse.hour).replace(/[^0-9]/g, "")
    : primaryOption?.learningHours
    ? String(primaryOption.learningHours).replace(/[^0-9]/g, "")
    : "";
  const resolvedClasses = apiCourse.classes
    ? String(apiCourse.classes).replace(/[^0-9]/g, "")
    : primaryOption?.classes
    ? String(primaryOption.classes).replace(/[^0-9]/g, "")
    : apiCourse.lectures
    ? String(apiCourse.lectures).replace(/[^0-9]/g, "")
    : "";

  return {
    ...fallbackCourse,
    ...apiCourse,
    id: apiCourse.id,
    title: apiCourse.title || apiCourse.name || fallbackCourse?.title || "",
    image: resolvedImage,
    banner: resolvedImage,
    description: descriptionText,
    overview: descriptionText,
    overview_description: overviewDescriptionText,
    course_type: courseType,
    type: courseType,
    price: resolvedPrice,
    hour: resolvedHours,
    learningHours: primaryOption?.learningHours || resolvedHours,
    classes: resolvedClasses,
    duration: primaryOption?.duration || durationStr,
    class_duration: primaryOption?.classDuration || classDurationStr,
    time: primaryOption?.time || timeStr,
    seats: apiCourse.seats ? String(apiCourse.seats) : null,
    enrollmentOptions,
    curriculums: apiCourse.curriculums || [],
    softwares: apiCourse.softwares || apiCourse.softwares_included || [],
    forWhoms: apiCourse.forWhoms || apiCourse.designed_for || [],
    benefits: apiCourse.benefits || [],
    projects: apiCourse.projects || [],
    positions: apiCourse.positions || apiCourse.open_job_positions || [],
  };
};


