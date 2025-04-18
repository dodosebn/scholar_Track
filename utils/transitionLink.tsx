'use client';
import Link, {LinkProps} from 'next/link';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
interface TransitionLinkProps extends LinkProps{
    children: ReactNode;
    href: string;
}
function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const TransitionLink  = ({children, href, ...props}: TransitionLinkProps) => {
    const router = useRouter();
    const handleTransition = async(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
e.preventDefault();
const body = document.querySelector('body');
body?.classList.add('page-transition');
await sleep(200);
router.push(href);
await sleep(200);

body?.classList.remove('page-transition');
    }
  return (
<Link href={href} {...props} onClick={handleTransition}>{children}</Link>
  )
}

export default TransitionLink;
