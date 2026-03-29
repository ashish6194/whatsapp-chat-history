import { Chat, Message } from './types';

const OUTGOING_SENDER = 'You';

function msg(
  id: number,
  date: string,
  time: string,
  sender: string,
  content: string,
  type: 'text' | 'media' | 'system' = 'text',
  mediaType?: 'image' | 'video' | 'audio' | 'document' | 'sticker'
): Message {
  const [day, month, year] = date.split('/').map(Number);
  const [hours, minutes] = time.split(':').map(Number);
  return {
    id: String(id),
    timestamp: new Date(2000 + year, month - 1, day, hours, minutes),
    sender,
    content,
    type,
    mediaType,
    isOutgoing: sender === OUTGOING_SENDER,
  };
}

export const sampleChat: Chat = {
  name: 'College Friends',
  isGroup: true,
  participants: ['You', 'Priya', 'Rahul', 'Sneha', 'Amit'],
  messages: [
    msg(1, '15/03/25', '09:00', '', 'Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.', 'system'),
    msg(2, '15/03/25', '09:01', 'Priya', 'Hey everyone! Are we still on for the trip this weekend?'),
    msg(3, '15/03/25', '09:02', 'Rahul', 'Yes! I already booked the campsite'),
    msg(4, '15/03/25', '09:02', 'You', 'Count me in! What should I bring?'),
    msg(5, '15/03/25', '09:03', 'Sneha', 'I can bring the tent and sleeping bags'),
    msg(6, '15/03/25', '09:04', 'Amit', 'I will handle the food. Any dietary restrictions?'),
    msg(7, '15/03/25', '09:05', 'You', 'Nothing for me, thanks!'),
    msg(8, '15/03/25', '09:05', 'Priya', 'Same here'),
    msg(9, '15/03/25', '09:07', 'Rahul', '<Media omitted>', 'media', 'image'),
    msg(10, '15/03/25', '09:07', 'Rahul', 'Here is the map to the campsite ^^'),
    msg(11, '15/03/25', '09:10', 'Sneha', 'Looks amazing! Is there a lake nearby?'),
    msg(12, '15/03/25', '09:11', 'Rahul', 'Yes! About 10 minutes walk from the site'),
    msg(13, '15/03/25', '09:15', 'Amit', 'Perfect for morning fishing'),
    msg(14, '15/03/25', '09:20', 'You', 'Should we leave Friday evening or Saturday morning?'),
    msg(15, '15/03/25', '09:22', 'Priya', 'Friday evening would be better. We can set up camp before dark'),
    msg(16, '15/03/25', '09:25', 'Sneha', 'Agreed! I can pick up Amit on the way'),
    msg(17, '15/03/25', '09:30', 'Amit', 'Thanks Sneha! I will be ready by 4pm'),

    // Next day
    msg(18, '16/03/25', '08:00', 'Priya', 'Good morning everyone! I just checked the weather forecast'),
    msg(19, '16/03/25', '08:01', 'Priya', 'weather_forecast.jpg (file attached)', 'media', 'image'),
    msg(20, '16/03/25', '08:02', 'Priya', 'Looks like clear skies all weekend!'),
    msg(21, '16/03/25', '08:15', 'You', 'That is great news! I am so excited'),
    msg(22, '16/03/25', '08:20', 'Rahul', 'Do not forget to bring sunscreen and mosquito repellent'),
    msg(23, '16/03/25', '08:25', 'Sneha', 'Good call. I will add those to my list'),
    msg(24, '16/03/25', '10:00', 'Amit', 'Guys, I made a packing checklist for everyone'),
    msg(25, '16/03/25', '10:01', 'Amit', 'camping_checklist.pdf (file attached)', 'media', 'document'),
    msg(26, '16/03/25', '10:05', 'You', 'This is super helpful, thanks Amit!'),
    msg(27, '16/03/25', '10:10', 'Priya', 'Who is driving? We need to figure out carpooling'),
    msg(28, '16/03/25', '10:12', 'Rahul', 'I can take my car. It fits 4 people'),
    msg(29, '16/03/25', '10:13', 'Sneha', 'I will drive too. We can split into two cars'),
    msg(30, '16/03/25', '10:15', 'You', 'I will ride with Rahul if that is ok'),
    msg(31, '16/03/25', '10:16', 'Rahul', 'Of course!'),
    msg(32, '16/03/25', '14:30', 'Amit', 'Just went grocery shopping. We are eating well this weekend!'),
    msg(33, '16/03/25', '14:31', 'Amit', '<Media omitted>', 'media', 'image'),
    msg(34, '16/03/25', '14:35', 'Sneha', 'Wow that is a LOT of food'),
    msg(35, '16/03/25', '14:36', 'Amit', 'Better too much than too little right?'),
    msg(36, '16/03/25', '14:40', 'You', 'My stomach already approves'),

    // Trip day
    msg(37, '17/03/25', '15:00', 'Priya', 'Almost ready! Leaving in 30 mins'),
    msg(38, '17/03/25', '15:05', 'Rahul', 'Same here. You, I will pick you up at 3:30'),
    msg(39, '17/03/25', '15:06', 'You', 'Sounds good, I am ready!'),
    msg(40, '17/03/25', '15:30', 'Sneha', 'Picked up Amit. On our way now!'),
    msg(41, '17/03/25', '15:31', 'Sneha', '<Media omitted>', 'media', 'audio'),
    msg(42, '17/03/25', '16:00', 'Rahul', 'We are on the highway. Traffic is light!'),
    msg(43, '17/03/25', '17:30', 'Priya', 'We are here! The view is incredible'),
    msg(44, '17/03/25', '17:31', 'Priya', '<Media omitted>', 'media', 'video'),
    msg(45, '17/03/25', '17:35', 'You', 'Almost there! 10 more minutes'),
    msg(46, '17/03/25', '17:50', 'Rahul', 'We made it! Let us set up camp'),
    msg(47, '17/03/25', '18:30', 'Amit', 'Campfire is ready! Who wants marshmallows?'),
    msg(48, '17/03/25', '18:31', 'You', 'ME!!!'),
    msg(49, '17/03/25', '18:31', 'Sneha', 'Obviously yes!'),
    msg(50, '17/03/25', '18:32', 'Priya', 'This is the best trip ever already'),
    msg(51, '17/03/25', '20:00', 'Rahul', 'sunset_campsite.jpg (file attached)', 'media', 'image'),
    msg(52, '17/03/25', '20:01', 'Rahul', 'What a sunset! We need to come back here'),
    msg(53, '17/03/25', '20:05', 'You', 'Absolutely. Same time next month?'),
    msg(54, '17/03/25', '20:06', 'Priya', 'Deal!'),
    msg(55, '17/03/25', '20:06', 'Amit', 'Count me in'),
    msg(56, '17/03/25', '20:07', 'Sneha', 'Yes please!'),
  ],
};

export const SAMPLE_OUTGOING_SENDER = OUTGOING_SENDER;
