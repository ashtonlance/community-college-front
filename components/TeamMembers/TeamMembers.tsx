import { Separator } from 'components/Separator'
import { Member } from './Member'

type TeamMemberProps = {
  attributes: {
    data: {
      team_member: number
      background_color: string
      title: string
    }
  }
}

export const TeamMembers = ({ attributes }: TeamMemberProps) => {
  const members = attributes.data.team_member
  const bgColor = attributes.data.background_color
  const title = attributes.data.title

  return (
    <div
      className={`module-color-${bgColor} flex flex-col w-full items-center`}
    >
      <div className="wrapper-default-inner-pages mx-auto">
        {title && (
          <>
            <h2 className="mb-[40px]">{title}</h2>
            <Separator classes={'mb-[60px]'} />
          </>
        )}
        <div className="grid grid-cols-3 grid-flow-row gap-[20px] md:grid-cols-2 sm:grid-cols-1">
          {members > 0 &&
            [...Array(members).keys()].map(val => (
              <Member
                key={val}
                img={attributes.data[`team_member_${val}_photo`]}
                name={attributes.data[`team_member_${val}_name`]}
                job={attributes.data[`team_member_${val}_job_title`]}
                linkedinURL={
                  attributes.data[`team_member_${val}_linkedin_link`]
                }
                email={attributes.data[`team_member_${val}_email_link`]}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

TeamMembers.displayName = 'nextword/teammembercards'
