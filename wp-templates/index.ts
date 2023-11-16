import Category from './category'
import FrontPage from './front-page'
import Page from './page'
import AnnualReportsPage from './page-annual-reports'
import PageApprenticeshipOpportunities from './page-apprenticeship-opportunities'
import BoardMembersPage from './page-board-members'
import FacultyAndStaffPage from './page-college-faculty-staff'
import CollegesAchive from './page-colleges'
import PageDataDashboards from './page-data-dashboards'
import EmployersPage from './page-employers'
import Events from './page-events'
import FoundationBoardMembersPage from './page-foundation-board-members'
import NewsPage from './page-news'
import NumberedMemosPage from './page-numbered-memos'
import ProgramFinder from './page-program-finder'
import ProgramsArchive from './page-programs'
import PagePropSchools from './page-proprietary-schools-directory'
import PagePublicInformationOfficers from './page-public-information-officers'
import StaffIndexPage from './page-staff'
import StateBoardMeetingMinutesPage from './page-state-board-meeting-minutes'
import StateBoardPropSchoolsMeetingMinutesPage from './page-state-board-of-proprietary-schools-meeting-minutes'
import SystemOfficePage from './page-system-office'
import SingleAnnualReport from './single-annual-reports'
import SingleApprenticeshipOpportunity from './single-apprenticeship-opp'
import SingleBoardMeeting from './single-board-meetings'
import SingleBoardMember from './single-board-member'
import SingleCollege from './single-college'
import SingleDataDashboard from './single-data-dashboards'
import SingleEvent from './single-events'
import SingleNews from './single-news'
import SingleNumberedMemo from './single-numbered-memo'
import SingleProgram from './single-program'
import SingleProgramArea from './single-program-areas'
import SingleStaff from './single-staff'
import NewsTaxonomyCatPage from './taxonomy-news-categories'
import NewsTaxonomyPage from './taxonomy-news-tags'

const templates = {
  'front-page': FrontPage,
  page: Page,
  category: Category,
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
  'single-staff': SingleStaff,
  'taxonomy-news-tags': NewsTaxonomyPage,
  'taxonomy-news-categories': NewsTaxonomyCatPage,
}

export default templates
