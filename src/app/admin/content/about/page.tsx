import AdminContentEditor from "@/components/admin/AdminContentEditor";
import { getAboutContent } from "@/features/content/content.service";
export default async function Page() { return <AdminContentEditor page="about" initialData={await getAboutContent("ar")} />; }
