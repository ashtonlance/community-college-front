import Image from 'next/image'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useState } from 'react'
import copy from 'assets/icons/copy.png'
import twitter from 'assets/icons/twitter.png'
import facebook from 'assets/icons/fb.png'
import li from 'assets/icons/li.png'


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
    <div className="flex items-center gap-[20px]">
      <small className="body-small font-bold text-navy">
        Share this page:
      </small>

      <CopyToClipboard text={props.postUrl} onCopy={() => setCopied(true)}>
        {copied ? 
          <span className="body-small text-navy">Copied</span> :  
          <Image
          alt=""
          src={copy}
          width={24}
          height={24}
          className="cursor-pointer"
        />}
      </CopyToClipboard>

      <FacebookShareButton url={props.postUrl}>
        <Image alt="" src={facebook} width={24} height={24} className="" />
      </FacebookShareButton>

      <TwitterShareButton url={props.postUrl}>
        <Image alt="" src={twitter} width={24} height={24} className="" />
      </TwitterShareButton>

      <LinkedinShareButton url={props.postUrl}>
        <Image alt="" src={li} width={24} height={24} className="" />
      </LinkedinShareButton>
    </div>
  )
}
