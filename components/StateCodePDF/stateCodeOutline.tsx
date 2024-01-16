import Link from 'next/link';
import { useRouter } from 'next/router';

export const StateCodeOutline = ({baseUrl}) => { 
    const router = useRouter();

    baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash if present

    function sectionKeyToUrl(sectionKey) {
        const url = new URL(`${baseUrl}${router.asPath}`);
        const searchParams = new URLSearchParams(url.search);

        if (sectionKey) {
            searchParams.set('sectionKey', sectionKey);
        } else {
            searchParams.delete('sectionKey');
        }

        url.search = searchParams.toString();

        return url.toString();
    }

    return (
<ul>
        <li><Link href={sectionKeyToUrl('')}>State Board of Community Colleges Code (SBCCC)</Link> 
                <ul>
                        <li><Link href={sectionKeyToUrl('title-1-community-colleges')}>TITLE
                                        1. COMMUNITY COLLEGES</Link> 
                                <ul>
                                        <li><Link href={sectionKeyToUrl('chapter-state-board-governance')}>CHAPTER
                                                        A. STATE BOARD GOVERNANCE</Link> 
                                                <ul>
                                                        <li><Link href={sectionKeyToUrl('subchapter-100-definitions-3')}>SUBCHAPTER
                                                                        100. DEFINITIONS</Link> </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-200-state-board-authority')}>SUBCHAPTER
                                                                        200. STATE BOARD
                                                                        AUTHORITY</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1a-sbccc-2001-mission-community-college-system')}>1A
                                                                                        SBCCC
                                                                                        200.1 Mission of the Community
                                                                                        College System</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1a-sbccc-2002-state-planning')}>1A
                                                                                        SBCCC 200.2 State
                                                                                        Planning</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1a-sbccc-2003-authority-waive-sbcc-code-provision')}>1A
                                                                                        SBCCC
                                                                                        200.3 Authority to Waive a SBCC
                                                                                        Code Provision</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1a-sbccc-2004-sound-fiscal-and-management-practices')}>1A
                                                                                        SBCCC 200.4 Sound Fiscal and
                                                                                        Management Practices</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1a-sbccc-2005-system-advisory-council')}>1A
                                                                                        SBCCC 200.5 System
                                                                                        Advisory Council</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1a-sbccc-2006-delegation-contractual-authority')}>1A
                                                                                        SBCCC
                                                                                        200.6 Delegation of Contractual
                                                                                        Authority</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-300-college-service-areas')}>SUBCHAPTER
                                                                        300. COLLEGE
                                                                        SERVICE AREAS</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1a-sbccc-3001-definitions')}>1A
                                                                                        SBCCC 300.1 Definitions</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1a-sbccc-3002-establishing-service-areas-colleges')}>1A
                                                                                        SBCCC
                                                                                        300.2 Establishing Service Areas
                                                                                        for Colleges</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1a-sbccc-3003-service-area-assignments')}>1A
                                                                                        SBCCC 300.3
                                                                                        Service Area Assignments</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1a-sbccc-3004-establishing-military-service-areas')}>1A
                                                                                        SBCCC
                                                                                        300.4 Establishing Military
                                                                                        Service Areas</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1a-sbccc-30098-establishing-military-service-areas-recodified-1a-sbccc-3004')}>1A
                                                                                        SBCCC 300.98 Establishing
                                                                                        Military Service Areas
                                                                                        (Recodified at 1A SBCCC
                                                                                        300.4)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1a-sbccc-30099-instructional-service-agreements-repealed-eff-1-november-2014')}>1A
                                                                                        SBCCC 300.99 Instructional
                                                                                        Service Agreements (Repealed
                                                                                        Eff. 1 November
                                                                                        2014)</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-400-appeal-process-award-north-carolina-title-ii-adult-education-and-family')}>SUBCHAPTER
                                                                        400. APPEAL PROCESS FOR AWARD OF THE NORTH
                                                                        CAROLINA TITLE II ADULT EDUCATION AND
                                                                        FAMILY LITERACY ACT FISCAL YEARS 2018 – 2021
                                                                        COMPETITIVE GRANTS</Link> </li>
                                                </ul>
                                        </li>
                                        <li><Link href={sectionKeyToUrl('chapter-b-college-operations')}>CHAPTER
                                                        B. COLLEGE OPERATIONS</Link> 
                                                <ul>
                                                        <li><Link href={sectionKeyToUrl('subchapter-100-definitions-0')}>SUBCHAPTER
                                                                        100. DEFINITIONS</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1b-sbccc-1001-definitions')}>1B
                                                                                        SBCCC 100.1 Definitions</Link> 
                                                                        </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-200-establishing-and-closing-colleges-and-college-sites')}>SUBCHAPTER
                                                                        200. ESTABLISHING AND CLOSING COLLEGES AND
                                                                        COLLEGE SITES</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1b-sbccc-2001-establishing-colleges')}>1B
                                                                                        SBCCC 200.1
                                                                                        Establishing Colleges</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1b-sbccc-2002-name')}>1B
                                                                                        SBCCC 200.2 Name</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1b-sbccc-2003-establishing-multi-campus-centers')}>1B
                                                                                        SBCCC
                                                                                        200.3 Establishing Multi-Campus
                                                                                        Centers</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1b-sbccc-20099-community-college-closure')}>1B
                                                                                        SBCCC 200.99
                                                                                        Community College Closure</Link> 
                                                                        </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-300-board-trustees-authority')}>SUBCHAPTER
                                                                        300. BOARD OF
                                                                        TRUSTEES AUTHORITY</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1b-sbccc-3001-authority')}>1B
                                                                                        SBCCC 300.1 Authority</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1b-sbccc-3002-authorization')}>1B
                                                                                        SBCCC 300.2
                                                                                        Authorization</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-400-program-accountability')}>SUBCHAPTER
                                                                        400. PROGRAM
                                                                        ACCOUNTABILITY</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1b-sbccc-4001-accreditation-southern-association')}>1B
                                                                                        SBCCC
                                                                                        400.1 Accreditation by the
                                                                                        Southern Association</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1b-sbccc-4002-college-planning')}>1B
                                                                                        SBCCC 400.2 College
                                                                                        Planning</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1b-sbccc-4003-program-review')}>1B
                                                                                        SBCCC 400.3 Program
                                                                                        Review</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1b-sbccc-4004-provision-information-system-office')}>1B
                                                                                        SBCCC
                                                                                        400.4 Provision of Information
                                                                                        to the System Office</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1b-sbccc-4005-performance-accountability')}>1B
                                                                                        SBCCC 400.5
                                                                                        Performance Accountability</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1b-sbccc-40096-accreditation-southern-association-repealed-eff-1-october-2018')}>1B
                                                                                        SBCCC 400.96 Accreditation by
                                                                                        the Southern Association
                                                                                        (Repealed Eff. 01
                                                                                        October 2018)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1b-sbccc-40097-college-planning-repealed-eff-1-october-2018')}>1B
                                                                                        SBCCC 400.97 College Planning
                                                                                        (Repealed Eff. 01 October
                                                                                        2018)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1b-sbccc-40098-program-review-repealed-eff-01-october-2018')}>1B
                                                                                        SBCCC 400.98 Program Review
                                                                                        (Repealed Eff. 01 October
                                                                                        2018)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1b-sbccc-40099-provision-information-department-community-colleges-repealed-eff-01-october')}>1B
                                                                                        SBCCC 400.99 Provision of
                                                                                        Information to the Department of
                                                                                        Community
                                                                                        Colleges (Repealed Eff. 01
                                                                                        October 2018)</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-500-student-rights-and-responsibilities')}>SUBCHAPTER
                                                                        500.
                                                                        STUDENT RIGHTS AND RESPONSIBILITIES</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1b-sbccc-5001-excused-absence-military-service')}>1B
                                                                                        SBCCC
                                                                                        500.1 Excused Absence for
                                                                                        Military Service</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1b-sbccc-50098-educational-guarantee')}>1B
                                                                                        SBCCC 500.98
                                                                                        Educational Guarantee</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1b-sbccc-50099-school-absence-religious-observances')}>1B
                                                                                        SBCCC 500.99 School Absence for
                                                                                        Religious Observances</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-600-general-college-operations')}>SUBCHAPTER
                                                                        600. GENERAL
                                                                        COLLEGE OPERATIONS</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1b-sbccc-60099-intercollegiate-athletics')}>1B
                                                                                        SBCCC 600.99
                                                                                        Intercollegiate Athletics</Link> 
                                                                        </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-700-information-security-program')}>SUBCHAPTER
                                                                        700
                                                                        Information Security Program</Link> </li>
                                                </ul>
                                        </li>
                                        <li><Link href={sectionKeyToUrl('chapter-c-personnel')}>CHAPTER
                                                        C.
                                                        PERSONNEL</Link> 
                                                <ul>
                                                        <li><Link href={sectionKeyToUrl('subchapter-100-definitions')}>SUBCHAPTER
                                                                        100. DEFINITIONS</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-1001-reserved-future-codification')}>1C
                                                                                        SBCCC 100.1
                                                                                        Reserved for Future
                                                                                        Codification</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-200-personnel-policies')}>SUBCHAPTER
                                                                        200. PERSONNEL
                                                                        POLICIES</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-20094-local-college-personnel-policies')}>1C
                                                                                        SBCCC
                                                                                        200.94 Local College Personnel
                                                                                        Policies</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-20095-civil-rights')}>1C
                                                                                        SBCCC 200.95 Civil
                                                                                        Rights</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-20096-equal-employment-opportunity')}>1C
                                                                                        SBCCC 200.96
                                                                                        Equal Employment Opportunity</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-20097-employment-women-and-minorities-administrative-positions')}>1C
                                                                                        SBCCC 200.97 Employment of Women
                                                                                        and Minorities in Administrative
                                                                                        Positions</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-20098-employment-relatives')}>1C
                                                                                        SBCCC 200.98
                                                                                        Employment of Relatives</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-20099-political-activities-employees')}>1C
                                                                                        SBCCC
                                                                                        200.99 Political Activities of
                                                                                        Employees</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-200100-paid-parental-leave')}>1C
                                                                                        SBCCC 200.100 Paid
                                                                                        Parental Leave</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-300-employmenthiring-practices')}>SUBCHAPTER
                                                                        300.
                                                                        EMPLOYMENT/HIRING PRACTICES</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-3001-presidential-selection-process')}>1C
                                                                                        SBCCC 300.1
                                                                                        Presidential Selection
                                                                                        Process</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-3002-evaluation-presidents')}>1C
                                                                                        SBCCC 300.2
                                                                                        Evaluation of Presidents</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-3003-faculty-standards')}>1C
                                                                                        SBCCC 300.3 Faculty
                                                                                        Standards</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-3004-re-employment-retired-persons')}>1C
                                                                                        SBCCC 300.4
                                                                                        Re-Employment of Retired
                                                                                        Persons</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-30096-administrative-repealed-eff-01-january-2020')}>1C
                                                                                        SBCCC 300.96 Administrative
                                                                                        (Repealed Eff. 01 January
                                                                                        2020)</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-400-salaries-and-benefits')}>SUBCHAPTER
                                                                        400. SALARIES AND
                                                                        BENEFITS</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-4001-definitions')}>1C
                                                                                        SBCCC 400.1 Definitions</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-4002-college-president-salaries')}>1C
                                                                                        SBCCC 400.2
                                                                                        College President Salaries</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-4003-college-employee-rates-pay')}>1C
                                                                                        SBCCC 400.3
                                                                                        College Employee Rates of
                                                                                        Pay</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-4004-reporting-college-employee-salaries')}>1C
                                                                                        SBCCC
                                                                                        400.4 Reporting of College
                                                                                        Employee Salaries</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-4005-contract-buy-outs')}>1C
                                                                                        SBCCC 400.5 Contract Buy
                                                                                        Outs</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-4006-educational-leave-pay')}>1C
                                                                                        SBCCC 400.6
                                                                                        Educational Leave with Pay</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-4007-military-leave')}>1C
                                                                                        SBCCC 400.7 Military
                                                                                        Leave</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-4008-longevity-pay-plan-college-personnel')}>1C
                                                                                        SBCCC
                                                                                        400.8 Longevity Pay Plan for
                                                                                        College Personnel</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-4009-employee-meritorious-service-awards')}>1C
                                                                                        SBCCC
                                                                                        400.9 Employee Meritorious
                                                                                        Service Awards</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-40010-payroll-deductions')}>1C
                                                                                        SBCCC 400.10 Payroll
                                                                                        Deductions</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-40011-leave-payouts')}>1C
                                                                                        SBCCC 400.11 Leave
                                                                                        Payouts</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-40094-establishing-pay-rates-repealed-eff-01-october-2018')}>1C
                                                                                        SBCCC 400.94 Establishing Pay
                                                                                        Rates (Repealed Eff. 01 October
                                                                                        2018)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-40095-contract-buy-outs-repealed-eff-01-october-2018')}>1C
                                                                                        SBCCC 400.95 Contract Buy Outs
                                                                                        (Repealed Eff. 01 October
                                                                                        2018)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-40096-educational-leave-pay-repealed-eff-01-october-2018')}>1C
                                                                                        SBCCC 400.96 Educational Leave
                                                                                        With Pay (Repealed Eff. 01
                                                                                        October 2018)</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-40097-military-leave-repealed-eff-01-october-2018')}>1C
                                                                                        SBCCC 400.97 Military Leave
                                                                                        (Repealed Eff. 01 October
                                                                                        2018)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-40098-longevity-pay-plan-college-personnel-repealed-eff-01-october-2018')}>1C
                                                                                        SBCCC 400.98 Longevity Pay Plan
                                                                                        for College Personnel (Repealed
                                                                                        Eff. 01
                                                                                        October 2018)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1c-sbccc-40099-payroll-deductions-repealed-eff-01-october-2018')}>1C
                                                                                        SBCCC 400.99 Payroll Deductions
                                                                                        (Repealed Eff. 01 October
                                                                                        2018)</Link> </li>
                                                                </ul>
                                                        </li>
                                                </ul>
                                        </li>
                                        <li><Link href={sectionKeyToUrl('chapter-d-education-programs')}>CHAPTER
                                                        D. EDUCATION PROGRAMS</Link> 
                                                <ul>
                                                        <li><Link href={sectionKeyToUrl('subchapter-100-general-definitions')}>SUBCHAPTER
                                                                        100. GENERAL
                                                                        DEFINITIONS</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-1001-reserved-future-codification')}>1D
                                                                                        SBCCC 100.1
                                                                                        Reserved for Future
                                                                                        Codification</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-200-basic-skills')}>SUBCHAPTER
                                                                        200. BASIC SKILLS</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-2001-basic-skills-definitions')}>1D
                                                                                        SBCCC 200.1 Basic
                                                                                        Skills Definitions</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-2002-enrollmenteligibility-requirements')}>1D
                                                                                        SBCCC
                                                                                        200.2 Enrollment/Eligibility
                                                                                        Requirements</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-2003-program-classification')}>1D
                                                                                        SBCCC 200.3 Program
                                                                                        Classification</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-20093-faculty')}>1D
                                                                                        SBCCC 200.93 Faculty</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-20094-basic-skills-plan')}>1D
                                                                                        SBCCC 200.94 Basic
                                                                                        Skills Plan</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-20095-education-services-minors')}>1D
                                                                                        SBCCC 200.95
                                                                                        Education Services for
                                                                                        Minors</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-20096-assessment-procedures')}>1D
                                                                                        SBCCC 200.96
                                                                                        Assessment Procedures</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-20097-program-monitoring')}>1D
                                                                                        SBCCC 200.97 Program
                                                                                        Monitoring</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-20098-basic-skills-plus')}>1D
                                                                                        SBCCC 200.98 Basic
                                                                                        Skills Plus</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-20099-drivers-eligibility-certificate')}>1D
                                                                                        SBCCC
                                                                                        200.99 Drivers&apos; Eligibility
                                                                                        Certificate</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-300-continuing-education')}>SUBCHAPTER
                                                                        300. CONTINUING
                                                                        EDUCATION</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-3001-definitions')}>1D
                                                                                        SBCCC 300.1 Definitions</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-3002-registration')}>1D
                                                                                        SBCCC 300.2 Registration</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-3003-program-description')}>1D
                                                                                        SBCCC 300.3 Program
                                                                                        Description</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-3004-program-management')}>1D
                                                                                        SBCCC 300.4 Program
                                                                                        Management</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-3005-course-standards')}>1D
                                                                                        SBCCC 300.5 Course
                                                                                        Standards</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-3006-instructional-service-agreements')}>1D
                                                                                        SBCCC
                                                                                        300.6 Instructional Service
                                                                                        Agreements</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-3009-clinical-practice')}>1D
                                                                                        SBCCC 300.9 Clinical
                                                                                        Practice</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-30010-work-based-learning')}>1D
                                                                                        SBCCC 300.10
                                                                                        Work-Based Learning</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-30094-faculty-repealed-eff-1-june-2016')}>1D
                                                                                        SBCCC
                                                                                        300.94 Faculty (Repealed Eff. 1
                                                                                        June 2016)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-30095-human-resources-development-program-continuation-repealed-eff-1-june-2016')}>1D
                                                                                        SBCCC 300.95 Human Resources
                                                                                        Development Program Continuation
                                                                                        (Repealed Eff.
                                                                                        1 June 2016)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-30096-continuing-education-program-management-repealed-eff-1-june-2016')}>1D
                                                                                        SBCCC 300.96 Continuing
                                                                                        Education Program Management
                                                                                        (Repealed Eff. 1 June
                                                                                        2016)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-30097-instructional-service-agreements-recodified-1d-sbccc-3006-eff-1-june-2016')}>1D
                                                                                        SBCCC 300.97 Instructional
                                                                                        Service Agreements (Recodified
                                                                                        at 1D SBCCC 300.6
                                                                                        Eff. 1 June 2016)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-30098-courses-and-standards-repealed-eff-1-june-2016')}>1D
                                                                                        SBCCC 300.98 Courses and
                                                                                        Standards (Repealed Eff. 1 June
                                                                                        2016)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-30099-education-services-minors-repealed-eff-1-june-2016')}>1D
                                                                                        SBCCC 300.99 Education Services
                                                                                        for Minors (Repealed Eff. 1 June
                                                                                        2016)</Link> 
                                                                        </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-400-curriculum-program-study')}>SUBCHAPTER
                                                                        400. CURRICULUM
                                                                        PROGRAM OF STUDY</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-4001-curriculum-definitions')}>1D
                                                                                        SBCCC 400.10
                                                                                        Curriculum Program of Study</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-4002-admission-colleges')}>1D
                                                                                        SBCCC 400.2 Admission
                                                                                        to Colleges</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-4003-program-classification')}>1D
                                                                                        SBCCC 400.3 Program
                                                                                        Classification</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-4004-faculty')}>1D
                                                                                        SBCCC 400.4 Faculty</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-4005-curriculum-instructional-contract-provisions')}>1D
                                                                                        SBCCC 400.5 Curriculum
                                                                                        Instructional Contract
                                                                                        Provisions</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-4006-curriculum-program-approvals-and-terminations')}>1D
                                                                                        SBCCC 400.6 Curriculum Program
                                                                                        Approvals and Terminations</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-4007-instructional-service-agreements')}>1D
                                                                                        SBCCC
                                                                                        400.7 Instructional Service
                                                                                        Agreements</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-4008-courses-curriculum-programs')}>1D
                                                                                        SBCCC 400.8
                                                                                        Courses for Curriculum
                                                                                        Programs</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-4009-curriculum-standards')}>1D
                                                                                        SBCCC 400.9
                                                                                        Curriculum Standards</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-40010-curriculum-program-study')}>1D
                                                                                        SBCCC 400.10
                                                                                        Curriculum Program of Study</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-40011-education-services-through-career-and-college-promise-curriculum')}>1D
                                                                                        SBCCC 400.11 Education Services
                                                                                        through Career and College
                                                                                        Promise
                                                                                        (Curriculum)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-40093-faculty-recodified-1d-sbccc-4004-eff-1-november-2017')}>1D
                                                                                        SBCCC 400.93 Faculty (Recodified
                                                                                        at 1D SBCCC 400.4 Eff. 1
                                                                                        November 2017)</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-40094-curriculum-instructional-contract-provisions-recodified-1d-sbccc-4005-eff-1')}>1D
                                                                                        SBCCC 400.94 Curriculum
                                                                                        Instructional Contract
                                                                                        Provisions (Recodified at 1D
                                                                                        SBCCC 400.5 Eff 1 November
                                                                                        2017)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-40095-curriculum-program-approvals-and-terminations-recodified-1d-sbccc-4006-eff-1')}>1D
                                                                                        SBCCC 400.95 Curriculum Program
                                                                                        Approvals and Terminations
                                                                                        (Recodified at 1D
                                                                                        SBCCC 400.6 Eff 1 November
                                                                                        2017)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-40096-instructional-service-agreements-recodified-1d-sbccc-4007-eff-1-november')}>1D
                                                                                        SBCCC 400.96 Instructional
                                                                                        Service Agreements (Recodified
                                                                                        at 1D SBCCC 400.7
                                                                                        Eff 1 November 2017)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-40097-courses-and-standards-curriculum-programs-recodified-1d-sbccc-4008-eff-1')}>1D
                                                                                        SBCCC 400.97 Courses and
                                                                                        Standards for Curriculum
                                                                                        Programs (Recodified at 1D
                                                                                        SBCCC 400.8 Eff 1 November
                                                                                        2017)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-40098-articulation-repealed-eff-1-november-2017')}>1D
                                                                                        SBCCC 400.98 Articulation
                                                                                        (Repealed Eff 1 November
                                                                                        2017)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-40099-career-and-college-promise-recodified-1d-sbccc-40011-eff-1-november-2017')}>1D
                                                                                        SBCCC 400.99 Career and College
                                                                                        Promise (Recodified at 1D SBCCC
                                                                                        400.11 Eff 1
                                                                                        November 2017)</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-500-customized-training')}>SUBCHAPTER
                                                                        500. CUSTOMIZED
                                                                        TRAINING</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-5001-program-classification')}>1D
                                                                                        SBCCC 500.1 Program
                                                                                        Classification</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-50098-customized-training')}>1D
                                                                                        SBCCC 500.98
                                                                                        Customized Training</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-50099-assistance-economic-development')}>1D
                                                                                        SBCCC
                                                                                        500.99 Assistance for Economic
                                                                                        Development</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-600-small-business-centers')}>SUBCHAPTER
                                                                        600. SMALL
                                                                        BUSINESS CENTERS</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-6001-program-classification')}>1D
                                                                                        SBCCC 600.1 Program
                                                                                        Classification</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-700-general-provisions')}>SUBCHAPTER
                                                                        700. GENERAL
                                                                        PROVISIONS</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-7001-audited-courses')}>1D
                                                                                        SBCCC 700.1 Audited
                                                                                        Courses</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-70098-instruction-captive-or-co-opted-groups')}>1D
                                                                                        SBCCC 700.98 Instruction to
                                                                                        Captive or Co-Opted Groups</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1d-sbccc-70099-live-projects-repealed-eff-1-november-2015')}>1D
                                                                                        SBCCC 700.99 Live Projects
                                                                                        (Repealed Eff. 1 November
                                                                                        2015)</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-800-credit-prior-learning')}>SUBCHAPTER
                                                                        800. CREDIT FOR
                                                                        PRIOR LEARNING</Link> </li>
                                                </ul>
                                        </li>
                                        <li><Link href={sectionKeyToUrl('chapter-e-student-tuition-and-fees')}>CHAPTER
                                                        E. STUDENT TUITION AND FEES</Link> 
                                                <ul>
                                                        <li><Link href={sectionKeyToUrl('subchapter-100-definitions-2')}>SUBCHAPTER
                                                                        100. DEFINITIONS</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-1001-definitions')}>1E
                                                                                        SBCCC 100.1 Definitions</Link> 
                                                                        </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-200-general-provisions')}>SUBCHAPTER
                                                                        200. GENERAL
                                                                        PROVISIONS</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-2001-authority-establish-tuition-and-fees')}>1E
                                                                                        SBCCC
                                                                                        200.1 Authority to Establish
                                                                                        Tuition and Fees</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-2002-time-due-deferred-payment-failure-pay')}>1E
                                                                                        SBCCC 200.2 Time Due, Deferred
                                                                                        Payment, Failure to Pay</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-20098-authority-establish-tuition-and-fees-repealed-eff-16-may-2014')}>1E
                                                                                        SBCCC 200.98 Authority to
                                                                                        Establish Tuition and Fees
                                                                                        (Repealed Eff. 16 May
                                                                                        2014)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-20099-deposit-fees-repealed-eff-16-may-2014')}>1E
                                                                                        SBCCC 200.99 Deposit of Fees
                                                                                        (Repealed Eff. 16 May 2014)</Link> 
                                                                        </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-300-curriculum-tuition')}>SUBCHAPTER
                                                                        300. CURRICULUM
                                                                        TUITION</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-3001-tuition-curriculum-programs')}>1E
                                                                                        SBCCC 300.1
                                                                                        Tuition for Curriculum
                                                                                        Programs</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-3002-family-relocation-tuition')}>1E
                                                                                        SBCCC 300.2
                                                                                        Family Relocation Tuition</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-30099-tuition-and-fees-curriculum-programs-repealed-eff-16-may-2014')}>1E
                                                                                        SBCCC 300.99 Tuition and Fees
                                                                                        for Curriculum Programs
                                                                                        (Repealed Eff. 16 May
                                                                                        2014)</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-400-continuing-education-registration-fees')}>SUBCHAPTER
                                                                        400. CONTINUING EDUCATION REGISTRATION FEES</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-4001-continuing-education-registration-fees')}>1E
                                                                                        SBCCC 400.1 Continuing Education
                                                                                        Registration Fees</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-40099-fees-extension-programs-repealed-eff-16-may-2014')}>1E
                                                                                        SBCCC 400.99 Fees for Extension
                                                                                        Programs (Repealed Eff. 16 May
                                                                                        2014)</Link> 
                                                                        </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-500-adult-high-school-equivalency-test-fees')}>SUBCHAPTER
                                                                        500. ADULT HIGH SCHOOL EQUIVALENCY TEST FEES</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-5001-adult-high-school-equivalency-test-fees')}>1E
                                                                                        SBCCC 500.1 Adult High School
                                                                                        Equivalency Test Fees</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-50099-reserved-future-codification')}>1E
                                                                                        SBCCC 500.99
                                                                                        Reserved for Future
                                                                                        Codification</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-600-self-supporting-course-sections')}>SUBCHAPTER
                                                                        600.
                                                                        SELF-SUPPORTING COURSE SECTIONS</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-6001-definitions')}>1E
                                                                                        SBCCC 600.1 Definitions</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-6002-authority-charge-self-supporting-fees')}>1E
                                                                                        SBCCC 600.2 Authority to Charge
                                                                                        Self-supporting Fees</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-6003-self-supporting-fee-rates')}>1E
                                                                                        SBCCC 600.3
                                                                                        Self-supporting Fee Rates</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-6004-deposit-and-use-self-supporting-fees')}>1E
                                                                                        SBCCC
                                                                                        600.4 Deposit and Use of
                                                                                        Self-supporting Fees</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-60099-fees-extension-programs-repealed-eff-16-may-2014')}>1E
                                                                                        SBCCC 600.99 Fees for Extension
                                                                                        Programs (Repealed Eff. 16 May
                                                                                        2014)</Link> 
                                                                        </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-700-local-fees')}>SUBCHAPTER
                                                                        700. LOCAL FEES</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-7001-general-provisions')}>1E
                                                                                        SBCCC 700.1 General
                                                                                        Provisions</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-7002-student-activity-fees')}>1E
                                                                                        SBCCC 700.2 Student
                                                                                        Activity Fees</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-7003-instructional-technology-fees')}>1E
                                                                                        SBCCC 700.3
                                                                                        Instructional Technology
                                                                                        Fees</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-7004-college-access-parking-and-security-caps-fees')}>1E
                                                                                        SBCCC 700.4 College Access,
                                                                                        Parking and Security (CAPS)
                                                                                        Fees</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-7005-required-specific-fees')}>1E
                                                                                        SBCCC 700.5
                                                                                        Required Specific Fees</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-7006-other-fees')}>1E
                                                                                        SBCCC 700.6 Other Fees</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-7007-excess-fee-receipts')}>1E
                                                                                        SBCCC 700.7 Excess Fee
                                                                                        Receipts</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-70098-other-fees-repealed-eff-16-may-2014')}>1E
                                                                                        SBCCC
                                                                                        700.98 Other Fees (Repealed Eff.
                                                                                        16 May 2014)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-70099-authority-establish-tuition-and-fees-repealed-eff-16-may-2014')}>1E
                                                                                        SBCCC 700.99 Authority to
                                                                                        Establish Tuition and Fees
                                                                                        (Repealed Eff. 16 May
                                                                                        2014)</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-800-waivers')}>SUBCHAPTER
                                                                        800. WAIVERS</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-8001-definitions')}>1E
                                                                                        SBCCC 800.1 Definitions</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-8002-general-provisions')}>1E
                                                                                        SBCCC 800.2 General
                                                                                        Provisions</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-80097-tuition-and-fees-curriculum-programs-repealed-eff-16-may-2014')}>1E
                                                                                        SBCCC 800.97 Tuition and Fees
                                                                                        for Curriculum Programs
                                                                                        (Repealed Eff. 16 May
                                                                                        2014)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-80098-fees-extension-programs-repealed-eff-16-may-2014')}>1E
                                                                                        SBCCC 800.98 Fees for Extension
                                                                                        Programs (Repealed Eff. 16 May
                                                                                        2014)</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-80099-fee-waivers-human-resources-development-program-repealed-eff-16-may-2014')}>1E
                                                                                        SBCCC 800.99 Fee Waivers for the
                                                                                        Human Resources Development
                                                                                        Program
                                                                                        (Repealed Eff. 16 May 2014)</Link> 
                                                                        </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-900-refunds')}>SUBCHAPTER
                                                                        900. REFUNDS</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-9001-curriculum-tuition-refunds')}>1E
                                                                                        SBCCC 900.1
                                                                                        Curriculum Tuition Refunds</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-9002-continuing-education-registration-fee-refunds')}>1E
                                                                                        SBCCC 900.2 Continuing Education
                                                                                        Registration Fee Refunds</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-9003-refund-due-death-student')}>1E
                                                                                        SBCCC 900.3
                                                                                        Refund Due to Death of
                                                                                        Student</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-9004-military-refund')}>1E
                                                                                        SBCCC 900.4 Military
                                                                                        Refund</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-9005-refund-self-supporting-and-local-fees')}>1E
                                                                                        SBCCC 900.5 Refund of
                                                                                        Self-Supporting and Local
                                                                                        Fees</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-90098-tuition-and-fees-curriculum-programs-repealed-eff-16-may-2014')}>1E
                                                                                        SBCCC 900.98 Tuition and Fees
                                                                                        for Curriculum Programs
                                                                                        (Repealed Eff. 16 May
                                                                                        2014)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1e-sbccc-90099-fees-extension-programs-repealed-eff-16-may-2014')}>1E
                                                                                        SBCCC 900.99 Fees for Extension
                                                                                        Programs (Repealed Eff. 16 May
                                                                                        2014)</Link> 
                                                                        </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-1000-audited-courses')}>SUBCHAPTER
                                                                        1000. AUDITED
                                                                        COURSES</Link> </li>
                                                </ul>
                                        </li>
                                        <li><Link href={sectionKeyToUrl('chapter-f-student-financial-assistance')}>CHAPTER
                                                        F. STUDENT FINANCIAL
                                                        ASSISTANCE</Link> 
                                                <ul>
                                                        <li><Link href={sectionKeyToUrl('subchapter-100-financial-aid')}>SUBCHAPTER
                                                                        100. FINANCIAL AID</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1f-sbccc-10097-student-loan-funds-vocational-and-technical-education')}>1F
                                                                                        SBCCC 100.97 Student Loan Funds
                                                                                        for Vocational and Technical
                                                                                        Education</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1f-sbccc-10098-community-college-grant-program')}>1F
                                                                                        SBCCC
                                                                                        100.98 Community College Grant
                                                                                        Program</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1f-sbccc-10099-targeted-assistanceless-half-time')}>1F
                                                                                        SBCCC
                                                                                        100.99 Targeted Assistance/Less
                                                                                        Than Half Time</Link> </li>
                                                                </ul>
                                                        </li>
                                                </ul>
                                        </li>
                                        <li><Link href={sectionKeyToUrl('chapter-g-full-time-equivalent-fte')}>CHAPTER
                                                        G. FULL-TIME EQUIVALENT
                                                        (FTE)</Link> 
                                                <ul>
                                                        <li><Link href={sectionKeyToUrl('subchapter-100-definitions-and-general-provisions')}>SUBCHAPTER
                                                                        100.
                                                                        DEFINITIONS AND GENERAL PROVISIONS</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1g-sbccc-1001-definitions')}>1G
                                                                                        SBCCC 100.1 Definitions</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1g-sbccc-10098-reserved-future-codification')}>1G
                                                                                        SBCCC 100.98
                                                                                        Reserved for Future
                                                                                        Codification</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1g-sbccc-10099-budget-fte-funding')}>1G
                                                                                        SBCCC 100.99 Budget
                                                                                        FTE Funding</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-200-fte-reporting-categoriescriteria')}>SUBCHAPTER
                                                                        200. FTE
                                                                        REPORTING CATEGORIES/CRITERIA</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1g-sbccc-2001-general-provisions')}>1G
                                                                                        SBCCC 200.1 General
                                                                                        Provisions</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1g-sbccc-20093-reporting-student-hours-membership-curriculum-classes')}>1G
                                                                                        SBCCC 200.93 Reporting of
                                                                                        Student Hours In Membership for
                                                                                        Curriculum
                                                                                        Classes</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1g-sbccc-20094-reporting-student-hours-membership-continuing-education-course-sections')}>1G
                                                                                        SBCCC 200.94 Reporting of
                                                                                        Student Hours In Membership for
                                                                                        Continuing
                                                                                        Education Course Sections</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1g-sbccc-20095-limitations-reporting-student-membership-hours')}>1G
                                                                                        SBCCC 200.95 Limitations In
                                                                                        Reporting Student Membership
                                                                                        Hours</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1g-sbccc-20096-training-public-safety-agencies')}>1G
                                                                                        SBCCC
                                                                                        200.96 Training for Public
                                                                                        Safety Agencies</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1g-sbccc-20097-human-resources-development-program-continuation')}>1G
                                                                                        SBCCC 200.97 Human Resources
                                                                                        Development Program
                                                                                        Continuation</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1g-sbccc-20098-customized-training-program')}>1G
                                                                                        SBCCC 200.98
                                                                                        Customized Training Program</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1g-sbccc-20099-reporting-student-membership-hours-department-repealed-eff-1-may-2017')}>1G
                                                                                        SBCCC 200.99 Reporting Student
                                                                                        Membership Hours to the
                                                                                        Department (Repealed
                                                                                        Eff. 1 May 2017)</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-300-reserved-future-codification')}>SUBCHAPTER
                                                                        300.
                                                                        RESERVED FOR FUTURE CODIFICATION</Link> </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-400-fte-reporting-accountability')}>SUBCHAPTER
                                                                        400. FTE
                                                                        REPORTING ACCOUNTABILITY</Link> </li>
                                                </ul>
                                        </li>
                                        <li><Link href={sectionKeyToUrl('chapter-h-fiscal-management')}>CHAPTER
                                                        H. FISCAL MANAGEMENT</Link> 
                                                <ul>
                                                        <li><Link href={sectionKeyToUrl('subchapter-100-definitions-1')}>SUBCHAPTER
                                                                        100. DEFINITIONS</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-1001-definitions')}>1H
                                                                                        SBCCC 100.1 Definitions</Link> 
                                                                        </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-200-state-funds')}>SUBCHAPTER
                                                                        200. STATE FUNDS</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-2001-allocation-funds')}>1H
                                                                                        SBCCC 200.1 Allocation of
                                                                                        Funds</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-2002-withholding-state-funds-or-administrative-support')}>1H
                                                                                        SBCCC 200.2 Withholding of State
                                                                                        Funds or Administrative
                                                                                        Support</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-2003-disbursement-state-funds')}>1H
                                                                                        SBCCC 200.3
                                                                                        Disbursement of State Funds</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-2004-expenditure-state-funds')}>1H
                                                                                        SBCCC 200.4
                                                                                        Expenditure of State Funds</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-2005-expenditure-state-funds-travel-and-allowances')}>1H
                                                                                        SBCCC 200.5 Expenditure of State
                                                                                        Funds: Travel and Allowances</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-2006-expenditure-state-funds-accreditation-expenses-dues')}>1H
                                                                                        SBCCC 200.6 Expenditure of State
                                                                                        Funds: Accreditation Expenses
                                                                                        &amp;
                                                                                        Dues</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-2007-expenditure-state-funds-campus-security')}>1H
                                                                                        SBCCC 200.7 Expenditure of State
                                                                                        Funds: Campus Security</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-2008-expenditure-state-funds-employee-recognition')}>1H
                                                                                        SBCCC 200.8 Expenditure of State
                                                                                        Funds: Employee Recognition</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-2009-expenditure-state-funds-prohibited-athletics')}>1H
                                                                                        SBCCC 200.9 Expenditure of State
                                                                                        Funds Prohibited: Athletics</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-20010-expenditure-state-funds-prohibited-promotional-giveaway-items')}>1H
                                                                                        SBCCC 200.10 Expenditure of
                                                                                        State Funds Prohibited:
                                                                                        Promotional Giveaway
                                                                                        Items</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-20011-expenditure-state-funds-prohibited-purposes')}>1H
                                                                                        SBCCC 200.11 Expenditure of
                                                                                        State Funds Prohibited:
                                                                                        Purposes</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-20086-withholding-state-funds-or-administrative-support-repealed-eff-1-november')}>1H
                                                                                        SBCCC 200.86 Withholding of
                                                                                        State Funds or Administrative
                                                                                        Support (Repealed
                                                                                        Eff. 1 November 2015)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-20087-operating-budget-requests-distribution-funds-repealed-eff-1-november-2015')}>1H
                                                                                        SBCCC 200.87 Operating Budget
                                                                                        Requests: Distribution of Funds
                                                                                        (Repealed Eff.
                                                                                        1 November 2015)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-20088-distribution-federal-vocational-education-funds-repealed-eff-1-november-2015')}>1H
                                                                                        SBCCC 200.88 Distribution of
                                                                                        Federal Vocational Education
                                                                                        Funds (Repealed
                                                                                        Eff. 1 November 2015)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-20089-equipment-budget-requests-distribution-funds-repealed-eff-1-november-2015')}>1H
                                                                                        SBCCC 200.89 Equipment Budget
                                                                                        Requests: Distribution of Funds
                                                                                        (Repealed Eff.
                                                                                        1 November 2015)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-20090-library-book-funding-system-and-budgetary-application-repealed-eff-1')}>1H
                                                                                        SBCCC 200.90 Library Book
                                                                                        Funding System and Budgetary
                                                                                        Application (Repealed
                                                                                        Eff. 1 November 2015)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-20091-appropriation-requests-and-allocation-policy-repealed-eff-1-november-2015')}>1H
                                                                                        SBCCC 200.91 Appropriation
                                                                                        Requests and Allocation Policy
                                                                                        (Repealed Eff. 1
                                                                                        November 2015)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-20092-disbursement-state-funds-repealed-eff-1-november-2015')}>1H
                                                                                        SBCCC 200.92 Disbursement of
                                                                                        State Funds (Repealed Eff. 1
                                                                                        November 2015)</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-20093-expenditure-state-funds-accreditation-expenses-dues-repealed-eff-1-november')}>1H
                                                                                        SBCCC 200.93 Expenditure of
                                                                                        State Funds: Accreditation
                                                                                        Expenses &amp; Dues
                                                                                        (Repealed Eff. 1 November
                                                                                        2015)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-20094-expenditure-state-funds-postage-machines-repealed-eff-1-november-2015')}>1H
                                                                                        SBCCC 200.94 Expenditure of
                                                                                        State Funds: Postage Machines
                                                                                        (Repealed Eff. 1
                                                                                        November 2015)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-20095-expenditure-state-funds-certificate-costs-repealed-eff-1-november-2015')}>1H
                                                                                        SBCCC 200.95 Expenditure of
                                                                                        State Funds: Certificate Costs
                                                                                        (Repealed Eff. 1
                                                                                        November 2015)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-20096-expenditure-state-funds-special-funds-repealed-eff-1-november-2015')}>1H
                                                                                        SBCCC 200.96 Expenditure of
                                                                                        State Funds: Special Funds
                                                                                        (Repealed Eff. 1
                                                                                        November 2015)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-20097-expenditure-state-funds-travel-and-allowances-repealed-eff-1-november-2015')}>1H
                                                                                        SBCCC 200.97 Expenditure of
                                                                                        State Funds: Travel and
                                                                                        Allowances (Repealed
                                                                                        Eff. 1 November 2015)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-20098-maintenance-plant-flexibility-repealed-eff-1-november-2015')}>1H
                                                                                        SBCCC 200.98 Maintenance of
                                                                                        Plant Flexibility (Repealed Eff.
                                                                                        1 November
                                                                                        2015)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-20099-expenditure-state-funds-prohibited-intercollegiate-athletics-repealed-eff-1')}>1H
                                                                                        SBCCC 200.99 Expenditure of
                                                                                        State Funds Prohibited:
                                                                                        Intercollegiate
                                                                                        Athletics (Repealed Eff. 1
                                                                                        November 2015)</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-300-institutional-funds')}>SUBCHAPTER
                                                                        300. INSTITUTIONAL
                                                                        FUNDS</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-3001-live-client-projects')}>1H
                                                                                        SBCCC 300.1 Live
                                                                                        Client Projects</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-3002-reserved-future-codification')}>1H
                                                                                        SBCCC 300.2
                                                                                        Reserved for Future
                                                                                        Codification</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-3003-bookstore-and-bookstore-commissions')}>1H
                                                                                        SBCCC
                                                                                        300.3 Bookstore and Bookstore
                                                                                        Commissions</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-3004-vending-and-concession-activities')}>1H
                                                                                        SBCCC
                                                                                        300.4 Vending and Concession
                                                                                        Activities</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-30097-live-projects-repealed-eff-1-november-2015')}>1H
                                                                                        SBCCC 300.97 Live Projects
                                                                                        (Repealed Eff. 1 November
                                                                                        2015)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-30098-handling-overhead-receipts-and-allowances-repealed-eff-1-november-2015')}>1H
                                                                                        SBCCC 300.98 Handling Overhead
                                                                                        Receipts and Allowances
                                                                                        (Repealed Eff. 1
                                                                                        November 2015)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-30099-bookstore-vending-machine-repealed-eff-1-november-2015')}>1H
                                                                                        SBCCC 300.99 Bookstore: Vending
                                                                                        Machine (Repealed Eff. 1
                                                                                        November 2015)</Link> 
                                                                        </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-400-property-and-capital-improvements')}>SUBCHAPTER
                                                                        400.
                                                                        PROPERTY AND CAPITAL IMPROVEMENTS</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-4001-definitions')}>1H
                                                                                        SBCCC 400.1 Definitions</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-4002-surplus-and-irreparable-books-and-book-media')}>1H
                                                                                        SBCCC 400.2 Surplus and
                                                                                        Irreparable Books and Book-Like
                                                                                        Media</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-4003-donated-or-loaned-property')}>1H
                                                                                        SBCCC 400.3
                                                                                        Donated or Loaned Property</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-4004-capital-project-approval-and-obtaining-capital-funds')}>1H
                                                                                        SBCCC 400.4 Capital Project
                                                                                        Approval and Obtaining Capital
                                                                                        Funds</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-4005-open-end-design-agreements')}>1H
                                                                                        SBCCC 400.5
                                                                                        Open-End Design Agreements</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-4006-construction-prequalification-policy')}>1H
                                                                                        SBCCC
                                                                                        400.6 Construction
                                                                                        Prequalification Policy</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-40093-surplus-and-irreparable-books-and-book-media-repealed-eff-1-november-2015')}>1H
                                                                                        SBCCC 400.93 Surplus and
                                                                                        Irreparable Books and Book Like
                                                                                        Media (Repealed
                                                                                        Eff. 1 November 2015)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-40094-equipment-purchases-repealed-eff-1-november-2015')}>1H
                                                                                        SBCCC 400.94 Equipment Purchases
                                                                                        (Repealed Eff. 1 November
                                                                                        2015)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-40095-surplus-property-repealed-eff-1-november-2015')}>1H
                                                                                        SBCCC 400.95 Surplus Property
                                                                                        (Repealed Eff. 1 November
                                                                                        2015)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-40096-donated-or-loaned-property-repealed-eff-1-november-2015')}>1H
                                                                                        SBCCC 400.96 Donated or Loaned
                                                                                        Property (Repealed Eff. 1
                                                                                        November 2015)</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-40097-acquisition-equipment-repealed-eff-1-november-2015')}>1H
                                                                                        SBCCC 400.97 Acquisition of
                                                                                        Equipment (Repealed Eff. 1
                                                                                        November 2015)</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-40098-capital-project-approval-and-obtaining-capital-funds-repealed-eff-1-november')}>1H
                                                                                        SBCCC 400.98 Capital Project
                                                                                        Approval and Obtaining Capital
                                                                                        Funds (Repealed
                                                                                        Eff. 1 November 2015)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-40099-open-end-design-agreements-repealed-eff-1-november-2015')}>1H
                                                                                        SBCCC 400.99 Open-End Design
                                                                                        Agreements (Repealed Eff. 1
                                                                                        November 2015)</Link> 
                                                                        </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-500-procurement')}>SUBCHAPTER
                                                                        500. PROCUREMENT</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-5001-noncertified-source-purchases')}>1H
                                                                                        SBCCC 500.1
                                                                                        Noncertified Source
                                                                                        Purchases</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-5002-special-purchasing-delegations')}>1H
                                                                                        SBCCC 500.2
                                                                                        Special Purchasing
                                                                                        Delegations</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-50095-purchasecomputer-hardware-system-softwarestate-contract-repealed-eff-1')}>1H
                                                                                        SBCCC 500.95 Purchase/Computer
                                                                                        Hardware: System Software/State
                                                                                        Contract
                                                                                        (Repealed Eff. 1 November
                                                                                        2015)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-50096-noncertified-source-purchases-repealed-eff-1-november-2015')}>1H
                                                                                        SBCCC 500.96 Noncertified Source
                                                                                        Purchases (Repealed Eff. 1
                                                                                        November
                                                                                        2015)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-50097-special-purchasing-delegations-repealed-eff-1-november-2015')}>1H
                                                                                        SBCCC 500.97 Special Purchasing
                                                                                        Delegations (Repealed Eff. 1
                                                                                        November
                                                                                        2015)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-50098-acquisition-automated-data-processing-adp-resources-repealed-eff-1-november')}>1H
                                                                                        SBCCC 500.98 Acquisition of
                                                                                        Automated Data Processing (ADP)
                                                                                        Resources
                                                                                        (Repealed Eff. 1 November
                                                                                        2015)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-50099-no-cost-extension-contracts-repealed-eff-1-november-2015')}>1H
                                                                                        SBCCC 500.99 No Cost Extension
                                                                                        of Contracts (Repealed Eff. 1
                                                                                        November
                                                                                        2015)</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-600-external-use-college-facilities-and-resources')}>SUBCHAPTER
                                                                        600. EXTERNAL USE OF COLLEGE FACILITIES AND
                                                                        RESOURCES</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-6001-assistance-economic-development')}>1H
                                                                                        SBCCC
                                                                                        600.1 Assistance for Economic
                                                                                        Development</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('1h-sbccc-60099-assistance-economic-development-repealed-eff-1-november-2015')}>1H
                                                                                        SBCCC 600.99 Assistance for
                                                                                        Economic Development (Repealed
                                                                                        Eff. 1 November
                                                                                        2015)</Link> </li>
                                                                </ul>
                                                        </li>
                                                </ul>
                                        </li>
                                </ul>
                        </li>
                        <li><Link href={sectionKeyToUrl('title-2-proprietary-schools')}>TITLE
                                        2.
                                        PROPRIETARY SCHOOLS</Link> 
                                <ul>
                                        <li><Link href={sectionKeyToUrl('chapter-proprietary-schools')}>CHAPTER
                                                        A. PROPRIETARY SCHOOLS</Link> 
                                                <ul>
                                                        <li><Link href={sectionKeyToUrl('subchapter-100-definitions-4')}>SUBCHAPTER
                                                                        100. DEFINITIONS</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('2a-sbccc-1001-definitions')}>2A
                                                                                        SBCCC 100.1 Definitions</Link> 
                                                                        </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-200-exemptions')}>SUBCHAPTER
                                                                        200. EXEMPTIONS</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('2a-sbccc-2001-exemption')}>2A
                                                                                        SBCCC 200.1 Exemption</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-300-licensure')}>SUBCHAPTER
                                                                        300. LICENSURE</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('2a-sbccc-3001-application-initial-license')}>2A
                                                                                        SBCCC 300.1
                                                                                        Application for Initial
                                                                                        License</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('2a-sbccc-3002-application-license-renewal')}>2A
                                                                                        SBCCC 300.2
                                                                                        Application for License
                                                                                        Renewal</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('2a-sbccc-3003-application-amend-license')}>2A
                                                                                        SBCCC 300.3
                                                                                        Application to Amend License</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('2a-sbccc-3004-application-upon-sale-proprietary-school')}>2A
                                                                                        SBCCC 300.4 Application Upon
                                                                                        Sale of Proprietary School</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('2a-sbccc-3005-suspension-revocation-or-failure-renew-license-repealed-eff-1-august-2014')}>2A
                                                                                        SBCCC 300.5 Suspension,
                                                                                        Revocation, or Failure to Renew
                                                                                        License (Repealed
                                                                                        Eff. 1 August 2014)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('2a-sbccc-3006-north-carolina-proprietary-school-fee-schedule')}>2A
                                                                                        SBCCC 300.6 North Carolina
                                                                                        Proprietary School Fee
                                                                                        Schedule</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-400-general-provisions')}>SUBCHAPTER
                                                                        400. GENERAL
                                                                        PROVISIONS</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('2a-sbccc-4001-administration')}>2A
                                                                                        SBCCC 400.1
                                                                                        Administration</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('2a-sbccc-4002-admission-requirements')}>2A
                                                                                        SBCCC 400.2
                                                                                        Admission Requirements</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('2a-sbccc-4003-advertising')}>2A
                                                                                        SBCCC 400.3 Advertising</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('2a-sbccc-4004-ethics')}>2A
                                                                                        SBCCC 400.4 Ethics</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('2a-sbccc-4005-faculty')}>2A
                                                                                        SBCCC 400.5 Faculty</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('2a-sbccc-4006-facilities-and-equipment')}>2A
                                                                                        SBCCC 400.6
                                                                                        Facilities and Equipment</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('2a-sbccc-4007-financial-stability')}>2A
                                                                                        SBCCC 400.7 Financial
                                                                                        Stability</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('2a-sbccc-4008-instructional-program')}>2A
                                                                                        SBCCC 400.8
                                                                                        Instructional Program</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('2a-sbccc-4009-issuance-certificates-and-diplomas')}>2A
                                                                                        SBCCC
                                                                                        400.9 Issuance of Certificates
                                                                                        and Diplomas</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('2a-sbccc-40010-student-complaints')}>2A
                                                                                        SBCCC 400.10 Student
                                                                                        Complaints</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('2a-sbccc-40011-student-records')}>2A
                                                                                        SBCCC 400.11 Student
                                                                                        Records</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('2a-sbccc-40012-student-refunds')}>2A
                                                                                        SBCCC 400.12 Student
                                                                                        Refunds</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('2a-sbccc-40013-teach-out-plan-and-record-retention')}>2A
                                                                                        SBCCC
                                                                                        400.13 Teach-Out Plan and Record
                                                                                        Retention</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-500-student-protection-fund')}>SUBCHAPTER
                                                                        500. STUDENT
                                                                        PROTECTION FUND</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('2a-sbccc-5001-administration-student-protection-fund')}>2A
                                                                                        SBCCC 500.1 Administration of
                                                                                        Student Protection Fund</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('2a-sbccc-5002-purpose-student-protection-fund')}>2A
                                                                                        SBCCC
                                                                                        500.2 Purpose of the Student
                                                                                        Protection Fund</Link> </li>
                                                                </ul>
                                                        </li>
                                                </ul>
                                        </li>
                                        <li><Link href={sectionKeyToUrl('chapter-b-due-process')}>CHAPTER
                                                        B. DUE PROCESS</Link> </li>
                                </ul>
                        </li>
                        <li><Link href={sectionKeyToUrl('title-3-rulemaking-process-and-codification-system')}>TITLE
                                        3. RULEMAKING PROCESS AND
                                        CODIFICATION SYSTEM</Link> 
                                <ul>
                                        <li><Link href={sectionKeyToUrl('chapter-general')}>CHAPTER
                                                        A. GENERAL</Link> 
                                                <ul>
                                                        <li><Link href={sectionKeyToUrl('subchapter-100-general')}>SUBCHAPTER
                                                                        100. GENERAL</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('3a-sbccc-1001-purpose')}>3A
                                                                                        SBCCC 100.1 Purpose</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('3a-sbccc-1002-definitions')}>3A
                                                                                        SBCCC 100.2 Definitions</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('3a-sbccc-10093-petitions-repealed-eff-1-june-2014')}>3A
                                                                                        SBCCC
                                                                                        100.93 Petitions (Repealed Eff.
                                                                                        1 June 2014)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('3a-sbccc-10094-hearing-officer-repealed-eff-1-june-2014')}>3A
                                                                                        SBCCC 100.94 Hearing Officer
                                                                                        (Repealed Eff. 1 June 2014)</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('3a-sbccc-10095-hearings-repealed-eff-1-june-2014')}>3A
                                                                                        SBCCC
                                                                                        100.95 Hearings (Repealed Eff. 1
                                                                                        June 2014)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('3a-sbccc-10096-statement-reasons-and-against-rule-making-decision-repealed-eff-1-june-2014')}>3A
                                                                                        SBCCC 100.96 Statement of
                                                                                        Reasons for and Against
                                                                                        Rule-Making Decision
                                                                                        (Repealed Eff. 1 June 2014)</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('3a-sbccc-10097-record-rule-making-proceedings-repealed-eff-1-june-2014')}>3A
                                                                                        SBCCC 100.97 Record of
                                                                                        Rule-Making Proceedings
                                                                                        (Repealed Eff. 1 June
                                                                                        2014)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('3a-sbccc-10098-fees-repealed-eff-1-june-2014')}>3A
                                                                                        SBCCC
                                                                                        100.98 Fees (Repealed Eff. 1
                                                                                        June 2014)</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('3a-sbccc-10099-declaratory-rulings-repealed-eff-1-june-2014')}>3A
                                                                                        SBCCC 100.99 Declaratory Rulings
                                                                                        (Repealed Eff. 1 June 2014)</Link> 
                                                                        </li>
                                                                </ul>
                                                        </li>
                                                </ul>
                                        </li>
                                        <li><Link href={sectionKeyToUrl('chapter-b-rulemaking-process')}>CHAPTER
                                                        B. RULEMAKING PROCESS</Link> 
                                                <ul>
                                                        <li><Link href={sectionKeyToUrl('subchapter-100-initiating-rulemaking-process')}>SUBCHAPTER
                                                                        100.
                                                                        INITIATING RULEMAKING PROCESS</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('3b-sbccc-1001-petition-rulemaking')}>3B
                                                                                        SBCCC 100.1 Petition
                                                                                        for Rulemaking</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('3b-sbccc-1002-state-board-review')}>3B
                                                                                        SBCCC 100.2 State Board
                                                                                        Review</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-200-public-input')}>SUBCHAPTER
                                                                        200. PUBLIC INPUT</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('3b-sbccc-2001-publication-proposed-rule')}>3B
                                                                                        SBCCC 200.1
                                                                                        Publication of Proposed Rule</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('3b-sbccc-2002-written-notification-proposed-rules')}>3B
                                                                                        SBCCC
                                                                                        200.2 Written Notification of
                                                                                        Proposed Rules</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('3b-sbccc-2003-public-comment-period')}>3B
                                                                                        SBCCC 200.3 Public
                                                                                        Comment Period</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('3b-sbccc-2004-public-hearing')}>3B
                                                                                        SBCCC 200.4 Public
                                                                                        Hearing</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-300-state-board-approval-process')}>SUBCHAPTER
                                                                        300. STATE
                                                                        BOARD APPROVAL PROCESS</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('3b-sbccc-3001-changes-based-public-comment')}>3B
                                                                                        SBCCC 300.1
                                                                                        Changes Based on Public
                                                                                        Comment</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('3b-sbccc-3002-state-board-rule-approval')}>3B
                                                                                        SBCCC 300.2
                                                                                        State Board Rule Approval</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('3b-sbccc-3003-effective-date')}>3B
                                                                                        SBCCC 300.3 Effective
                                                                                        Date</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-400-temporary-rules')}>SUBCHAPTER
                                                                        400. TEMPORARY RULES</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('3b-sbccc-4001-temporary-rule-standard')}>3B
                                                                                        SBCCC 400.1
                                                                                        Temporary Rule Standard</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('3b-sbccc-4002-adoption-temporary-rules')}>3B
                                                                                        SBCCC 400.2
                                                                                        Adoption of Temporary Rules</Link> 
                                                                        </li>
                                                                </ul>
                                                        </li>
                                                </ul>
                                        </li>
                                        <li><Link href={sectionKeyToUrl('chapter-c-codification-rules')}>CHAPTER
                                                        C. CODIFICATION OF RULES</Link> 
                                                <ul>
                                                        <li><Link href={sectionKeyToUrl('subchapter-100-general-rule-codification-provisions')}>SUBCHAPTER
                                                                        100.
                                                                        GENERAL RULE CODIFICATION PROVISIONS</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('3c-sbccc-1001-citation-authorities')}>3C
                                                                                        SBCCC 100.1 Citation
                                                                                        to Authorities</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('3c-sbccc-1002-illustrations-and-notes')}>3C
                                                                                        SBCCC 100.2
                                                                                        Illustrations and Notes</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('3c-sbccc-1003-codification-system')}>3C
                                                                                        SBCCC 100.3
                                                                                        Codification System</Link> </li>
                                                                </ul>
                                                        </li>
                                                        <li><Link href={sectionKeyToUrl('subchapter-200-rule-formatting')}>SUBCHAPTER
                                                                        200. RULE FORMATTING</Link> 
                                                                <ul>
                                                                        <li><Link href={sectionKeyToUrl('3c-sbccc-2001-rule-formatting-specifications')}>3C
                                                                                        SBCCC 200.1
                                                                                        Rule Formatting
                                                                                        Specifications</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('3c-sbccc-2002-rule-formatting-specifications-substantive-changes')}>3C
                                                                                        SBCCC 200.2 Rule Formatting
                                                                                        Specifications for Substantive
                                                                                        Changes</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('3c-sbccc-2003-chapter-division')}>3C
                                                                                        SBCCC 200.3 Chapter
                                                                                        Division</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('3c-sbccc-2004-subchapter-division')}>3C
                                                                                        SBCCC 200.4 Subchapter
                                                                                        Division</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('3c-sbccc-2005-section-division')}>3C
                                                                                        SBCCC 200.5 Section
                                                                                        Division</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('3c-sbccc-2006-history-note')}>3C
                                                                                        SBCCC 200.6 History Note</Link> 
                                                                        </li>
                                                                        <li><Link href={sectionKeyToUrl('3c-sbccc-2007-changes-title-chapter-subchapter-or-section-names-and-history-notes')}>3C
                                                                                        SBCCC 200.7 Changes to Title,
                                                                                        Chapter, Subchapter, or Section
                                                                                        Names and
                                                                                        History Notes</Link> </li>
                                                                        <li><Link href={sectionKeyToUrl('3c-sbccc-2008-recodification-rules')}>3C
                                                                                        SBCCC 200.8
                                                                                        Recodification of Rules</Link> </li>
                                                                </ul>
                                                        </li>
                                                </ul>
                                        </li>
                                </ul>
                        </li>
                        <li><Link href={sectionKeyToUrl('title-4-apprenticeshipnc')}>TITLE
                                        4.
                                        APPRENTICESHIPNC</Link> 
                                <ul>
                                        <li><Link href={sectionKeyToUrl('chapter-general-provisions')}>CHAPTER
                                                        A. GENERAL PROVISIONS</Link> </li>
                                        <li><Link href={sectionKeyToUrl('chapter-b-equal-employment-opportunity-apprenticeship')}>CHAPTER
                                                        B. EQUAL
                                                        EMPLOYMENT OPPORTUNITY IN APPRENTICESHIP</Link> </li>
                                </ul>
                        </li>
                </ul>
        </li>
</ul>
    );
}