import Link from 'next/link'
import Image from 'next/image'
import linkedinGray from '../../assets/icons/linkedinGray.svg'
import twitter from '../../assets/icons/twitter.svg'
import fb from '../../assets/icons/fb.svg'
import copy_link from '../../assets/icons/copy_link.svg'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useState } from 'react'

import {
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
} from 'react-share'

type SharePostProps = {
  postUrl: string
}

export default function SharePost(props: SharePostProps) {
  const [copied, setCopied] = useState(false)

  return (
    <div className="flex gap-[20px] items-center">
      <small className="font-bold body-small text-gmt-400">
        Share this page:
      </small>

      <CopyToClipboard text={props.postUrl} onCopy={() => setCopied(true)}>
        <Image
          alt=""
          src={copy_link}
          width={24}
          height={24}
          className="cursor-pointer"
        />
      </CopyToClipboard>

      <FacebookShareButton url={props.postUrl}>
        <Image alt="" src={fb} width={24} height={24} className="" />
      </FacebookShareButton>

      <TwitterShareButton url={props.postUrl}>
        <Image alt="" src={twitter} width={24} height={24} className="" />
      </TwitterShareButton>

      <LinkedinShareButton url={props.postUrl}>
        <Image alt="" src={linkedinGray} width={24} height={24} className="" />
      </LinkedinShareButton>
    </div>
  )
}
