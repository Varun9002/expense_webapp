import { DynamicIcon, IconName } from 'lucide-react/dynamic';

export default function IconLoader({ icon }: { icon: IconName }) {
	return <DynamicIcon name={icon}></DynamicIcon>;
}
