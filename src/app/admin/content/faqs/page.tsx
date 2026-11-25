import AdminContentEditor from "@/components/admin/AdminContentEditor";
import { getFaqContent } from "@/features/content/content.service";
export default async function Page() { return <AdminContentEditor page="faqs" initialData={await getFaqContent("ar")} />; }
