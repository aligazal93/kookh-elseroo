import AdminContentEditor from "@/components/admin/AdminContentEditor";
import { getContactContent } from "@/features/content/content.service";
export default async function Page() { return <AdminContentEditor page="contact" initialData={await getContactContent("ar")} />; }
