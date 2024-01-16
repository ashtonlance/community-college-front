import { useRouter } from 'next/router'
import { sectionKeyMappings } from './sectionMappings'; 
import { StateCodeOutline } from './stateCodeOutline';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from '@/components/Accordion/AccordionInternal'

export const StateCodePDF = () => { 
    const router = useRouter();
    const { query } = router;

    let sectionKey = query?.sectionKey || '';

    if (Array.isArray(sectionKey)) {
        sectionKey = sectionKey[0];
    }

    let relativeTargetPdfUrl = sectionKeyMappings[sectionKey];

    let baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

    baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash if present.

    if (!relativeTargetPdfUrl) {
        // Show the entire State Code if no section key is provided
        relativeTargetPdfUrl = '/wp-content/uploads/2023/11/entire_code_01nov23.pdf';
    } 

    const pdfUrl = `${baseUrl}${relativeTargetPdfUrl || ''}`;

    return (
        <div>
            <Accordion type="single" collapsible>
                <AccordionItem key="state-code-outline" value="state-code-outline">
                    <AccordionTrigger>Outline</AccordionTrigger>
                    
                    <AccordionContent>
                        <StateCodeOutline baseUrl={baseUrl}></StateCodeOutline>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <object data={pdfUrl} type="application/pdf" width="100%" height="800px"></object>
        </div>
    );
}
