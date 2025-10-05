/**
 * @typedef {Object} Subject
 * @property {string} _id
 * @property {string} title
 */

/**
 * @typedef {Object} SubjectScore
 * @property {Subject} subjectId
 * @property {number} totalMarkScored
 * @property {number} accuracy
 */

/**
 * @typedef {Object} User
 * @property {string} _id
 * @property {string} name
 * @property {string} profilePicture
 */

/**
 * @typedef {Object} LeaderboardEntry
 * @property {number} rank
 * @property {User} userId
 * @property {number} totalMarkScored
 * @property {number} accuracy
 * @property {SubjectScore[]} subjects
 * @property {number} marksGained
 * @property {number} marksLost
 * @property {number} unansweredMarks
 */

/**
 * @typedef {Object} PaginationMeta
 * @property {number} [totalItems]
 * @property {number} [itemCount]
 * @property {number} [itemsPerPage]
 * @property {number} [totalPages]
 * @property {number} [currentPage]
 */

/**
 * @typedef {Object} CurrentUserInfo
 * @property {number} rank
 * @property {User} userId
 * @property {number} totalMarkScored
 * @property {number} accuracy
 * @property {SubjectScore[]} subjects
 * @property {number} marksGained
 * @property {number} marksLost
 * @property {number} unansweredMarks
 */

/**
 * @typedef {Object} LeaderboardData
 * @property {LeaderboardEntry[]} results
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {string} message
 * @property {LeaderboardData} data
 * @property {PaginationMeta} [meta]
 * @property {CurrentUserInfo} [me]
 * @property {number} [totalPages]
 * @property {number} [totalResults]
 * @property {number} [lastRank]
 * @property {number} [userRank]
 */

/**
 * @typedef {Object} SocialPlatform
 * @property {string} name
 * @property {string} icon
 * @property {string} color
 * @property {string} shareUrl
 */

/**
 * @typedef {Object} ShareData
 * @property {string} title
 * @property {string} text
 * @property {string} url
 * @property {string[]} [hashtags]
 */

/**
 * @typedef {Object} AchievementLevel
 * @property {string} title
 * @property {string} color
 * @property {string} icon
 */

/**
 * @typedef {Object} SocialShareProps
 * @property {CurrentUserInfo} currentUser
 * @property {'icon' | 'button'} [variant]
 * @property {'sm' | 'default' | 'lg'} [size]
 * @property {string} [className]
 */

/**
 * @typedef {Object} AchievementModalProps
 * @property {boolean} isOpen
 * @property {() => void} onClose
 * @property {CurrentUserInfo} currentUser
 */

/**
 * @typedef {Object} ChartData
 * @property {string[]} labels
 * @property {Array<{
 *   label: string,
 *   data: number[],
 *   backgroundColor: string | string[],
 *   borderColor: string | string[],
 *   borderWidth?: number,
 *   tension?: number
 * }>} datasets
 */

/**
 * @typedef {Object} AnalyticsData
 * @property {ChartData} scoreDistribution
 * @property {ChartData} subjectPerformance
 * @property {ChartData} accuracyTrend
 * @property {ChartData} topPerformersComparison
 */

/**
 * @typedef {Object} AnalyticsProps
 * @property {LeaderboardEntry[]} leaderboardData
 * @property {CurrentUserInfo | null} [currentUser]
 */
