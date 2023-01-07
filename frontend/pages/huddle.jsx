import { HuddleClientProvider, getHuddleClient } from '@huddle01/huddle01-client';


export default function huddle() {
  const huddleClient = getHuddleClient(process.env.HUDDLE_KEY);
  return (
    <HuddleClientProvider client = {huddleClient} >
      <div>
        
      </div>
    </HuddleClientProvider>
  );
}