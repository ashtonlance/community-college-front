type TaggedArea = {
  slug: string
  name: string
  uri: string
}

type Program = {
  title: string
  uri: string
  featuredImage: {
    node: {
      sourceUrl: string
    }
  }
  seo: {
    fullHead: string
  }
  taggedProgramAreas: {
    nodes: TaggedArea[]
  }
  program: {
    about: string
    degreeTypes: string[]
    title: string
  }
}

export const capitalize = s =>
  s.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
    return str.toUpperCase()
  })

export const organizeProgramsByTaggedAreas = (
  programs: Program[]
): { [key: string]: { programs: Program[]; uri: string } } => {
  const organizedPrograms: {
    [key: string]: { programs: Program[]; uri: string }
  } = {}

  programs.forEach(program => {
    program.taggedProgramAreas.nodes.forEach((taggedArea: TaggedArea) => {
      if (!organizedPrograms[taggedArea.name]) {
        organizedPrograms[taggedArea.name] = {
          programs: [],
          uri: taggedArea.uri,
        }
      }
      organizedPrograms[taggedArea.name].programs.push(program)
    })
  })

  // Sort the keys
  const sortedKeys = Object.keys(organizedPrograms).sort()

  // Create a new object with the keys in alphabetical order
  const sortedPrograms: {
    [key: string]: { programs: Program[]; uri: string }
  } = {}
  sortedKeys.forEach(key => {
    sortedPrograms[key] = organizedPrograms[key]
  })

  return sortedPrograms
}
