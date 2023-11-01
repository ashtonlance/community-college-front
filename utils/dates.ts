import { format, isValid, parse } from 'date-fns'

export const formatDate = (date: string | number | Date): string | null => {
  let parsedDate: Date

  if (typeof date === 'string' && date.includes('/')) {
    const [day, month, year] = date.split('/')
    parsedDate = new Date(`${month}/${day}/${year}`)
  } else {
    parsedDate = new Date(date)
  }

  if (isValid(parsedDate)) {
    return format(parsedDate, 'LL/dd/yyyy')
  }

  return null
}

export const formatDateLong = (date: string | number | Date): string | null => {
  let parsedDate: Date

  if (typeof date === 'string' && date.includes('/')) {
    const [day, month, year] = date.split('/')
    parsedDate = new Date(`${month}/${day}/${year}`)
  } else {
    parsedDate = new Date(date)
  }

  if (isValid(parsedDate)) {
    return format(parsedDate, 'MMMM dd, yyyy')
  }

  return null
}

export const convertToDate = dateString => {
  //  Convert a "dd/MM/yyyy" string into a Date object
  let d = dateString.split('/')
  let dat = new Date(d[2] + '/' + d[1] + '/' + d[0])
  return dat
}
