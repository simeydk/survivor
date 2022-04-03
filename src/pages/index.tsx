import SurvivorPage from "./../components/SurvivorPage";
import { getAll } from '@/lib/survivor';
export default SurvivorPage;

export async function getStaticProps() {
    return {
        props: {
            initialData: JSON.parse(JSON.stringify(await getAll())),
            renderTime: Date.now(),
        },
        revalidate: 300,
    };

}
