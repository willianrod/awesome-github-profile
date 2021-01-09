import axios from "axios";

const { PAT } = process.env;

/**
 * Build graphQL query
 * Based on anuraghazra github-readme-stats
 * https://github.com/anuraghazra/github-readme-stats/blob/de8df72b38b71750eb7674028555bc07c180988d/src/fetchers/stats-fetcher.js#L9
 * @param {*} login 
 */
const buildQuery = githubUsername => {
    return {
        query: `
        query userInfo($login: String!) {
          user(login: $login) {
            name
            login
            avatarUrl
            contributionsCollection {
              totalCommitContributions
              restrictedContributionsCount
            }
            repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
              totalCount
            }
            pullRequests(first: 1) {
              totalCount
            }
            issues(first: 1) {
              totalCount
            }
            followers {
              totalCount
            }
            repositories(first: 100, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: STARGAZERS}) {
              totalCount
              nodes {
                stargazers {
                  totalCount
                }
              }
            }
          }
        }
        `,
        variables: {
            login: githubUsername,
        },
    };
}

export const requestProfileData = async githubUsername => {
    const { data: axiosData } = await axios.post('https://api.github.com/graphql', buildQuery(githubUsername), {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/vnd.github.cloak-preview",
            Authorization: `token ${PAT}`,
        },
    })

    return axiosData?.data?.user;
}