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
  'page-numbered-memos' : NumberedMemosPage,
}

export default templates
