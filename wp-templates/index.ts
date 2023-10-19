import FrontPage from './front-page'
import ResourcesArticle from './resources-article'
import ResourcesIndex from './resources-index'
import Page from './page'
import Events from './page-events'
import Category from './category'
import Tag from './tag'
import CollegesAchive from './page-colleges'
import SingleCollege from './single-college'
import FacultyAndStaffPage from './page-college-faculty-staff'
import EmployersPage from './page-employers'
import SystemOfficePage from './page-system-office'
import ProgramsArchive from './archive-programs'
import NumberedMemosPage from './page-numbered-memos'
import SingleNumberedMemo from './single-numbered-memo'
import SingleProgramArea from './single-program-areas'
import SingleProgram from './single-program'
import StaffIndexPage from './page-staff'
import ProgramFinder from './page-program-finder'
import AnnualReportsPage from './page-annual-reports'
import SingleAnnualReport from './single-annual-reports'
import NewsPage from './page-news'
import SingleNews from './single-news'
import BoardMembersPage from './page-board-members'
import SingleBoardMember from './single-board-member'
import SingleEvent from './single-events'
import PagePropSchools from './page-proprietary-schools-directory'
import PageApprenticeshipOpportunities from './page-apprenticeship-opportunities'
import SingleApprenticeshipOpportunity from './single-data-dashboards'
import PagePublicInformationOfficers from './page-public-information-officers'
import FoundationBoardMembersPage from './page-foundation-board-members'
import StateBoardMeetingMinutesPage from './page-state-board-meeting-minutes'
import SingleBoardMeeting from './single-board-meetings'
import StateBoardPropSchoolsMeetingMinutesPage from './page-state-board-of-proprietary-schools-meeting-minutes'
import PageDataDashboards from './page-data-dashboards'
import SingleDataDashboard from './single-data-dashboards'

const templates = {
  'front-page': FrontPage,
  page: Page,
  category: Category,
  tag: Tag,
  'single-resource': ResourcesArticle,
  'page-all-resources': ResourcesIndex,
  'single-events': SingleEvent,
  'page-events': Events,
  'page-colleges': CollegesAchive,
  'single-colleges': SingleCollege,
  'page-college-faculty-staff': FacultyAndStaffPage,
  'page-employers': EmployersPage,
  'page-businesses': EmployersPage,
  'page-system-office': SystemOfficePage,
  'page-about-us': SystemOfficePage,
  'page-programs': ProgramsArchive,
  'page-numbered-memos': NumberedMemosPage,
  'single-program-areas': SingleProgramArea,
  'single-programs': SingleProgram,
  'single-numbered-memos': SingleNumberedMemo,
  'page-staff-directory': StaffIndexPage,
  'page-program-finder': ProgramFinder,
  'page-annual-reporting': AnnualReportsPage,
  'page-annual-reporting-plans': AnnualReportsPage,
  'single-annual-reports': SingleAnnualReport,
  'page-news': NewsPage,
  'single-news': SingleNews,
  'page-board-members': BoardMembersPage,
  'single-board-members': SingleBoardMember,
  'page-proprietary-schools-directory': PagePropSchools,
  'page-apprenticeship-opportunities': PageApprenticeshipOpportunities,
  'single-apprenticeship-opp': SingleApprenticeshipOpportunity,
  'page-public-information-officers': PagePublicInformationOfficers,
  'page-foundation-board-members': FoundationBoardMembersPage,
  'page-state-board-meeting-minutes': StateBoardMeetingMinutesPage,
  'single-board-meetings': SingleBoardMeeting,
  'page-state-board-of-proprietary-schools-meeting-minutes':
    StateBoardPropSchoolsMeetingMinutesPage,
  'page-data-dashboards': PageDataDashboards,
  'single-data-dashboards': SingleDataDashboard,
}

export default templates
