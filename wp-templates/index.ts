import FrontPage from './front-page'
import ResourcesArticle from './resources-article'
import ResourcesIndex from './resources-index'
import Page from './page'
import Single from './single-event'
import Events from './page-events'
import Category from './category'
import Tag from './tag'
import CollegesAchive from './archive-colleges'
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

const templates = {
  'front-page': FrontPage,
  page: Page,
  category: Category,
  tag: Tag,
  'single-resource': ResourcesArticle,
  'page-all-resources': ResourcesIndex,
  'single-event': Single,
  'page-events': Events,
  'page-colleges': CollegesAchive,
  'single-colleges': SingleCollege,
  'page-college-faculty-staff': FacultyAndStaffPage,
  'page-employers': EmployersPage,
  'page-system-office': SystemOfficePage,
  'page-programs': ProgramsArchive,
  'page-numbered-memos': NumberedMemosPage,
  'single-program-areas': SingleProgramArea,
  'single-programs': SingleProgram,
  'single-numbered-memos': SingleNumberedMemo,
  'page-staff-directory': StaffIndexPage,
  'page-program-finder': ProgramFinder,
  'page-annual-reports': AnnualReportsPage,
}

export default templates
