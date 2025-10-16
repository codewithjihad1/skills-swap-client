# Quick Reference - Follow-Up Messaging Feature

## 🚀 Quick Start

### User Flow
```
Accepted Request Card → Click "Message" → Auto-create conversation → Navigate to Messages → Start chatting
```

### Key Functions

#### OutgoingRequestCard.tsx
```typescript
// Create conversation and navigate
const handleStartConversation = async () => {
    // Generate conversation ID
    const ids = [session.user.id, request.skillProvider._id].sort();
    const conversationId = ids.join("-");
    
    // Send initial message
    await sendMessageMutation.mutateAsync({
        conversationId,
        sender: session.user.id,
        receiver: request.skillProvider._id,
        content: "Hi! I'm reaching out about our skill exchange...",
        messageType: "text",
        skillContext: request.skillOffered?._id,
    });
    
    // Navigate
    router.push(`/dashboard/messages?conversationId=${conversationId}`);
};
```

#### Messages Page
```typescript
// Auto-select conversation from URL
useEffect(() => {
    const conversationIdFromUrl = searchParams?.get("conversationId");
    if (conversationIdFromUrl && conversations) {
        const exists = conversations.some(c => c._id === conversationIdFromUrl);
        if (exists) {
            setSelectedConversationId(conversationIdFromUrl);
        }
    }
}, [searchParams, conversations]);
```

## 🎯 Testing Commands

```bash
# Run dev server
pnpm dev

# Test URL directly
http://localhost:3000/dashboard/messages?conversationId=userId1-userId2
```

## 🔍 Debug Checklist

- [ ] User is logged in (session exists)
- [ ] Request is accepted (status === "accepted")
- [ ] Provider ID exists (request.skillProvider?._id)
- [ ] API endpoint is working (POST /api/messages)
- [ ] Navigation route exists (/dashboard/messages)
- [ ] Conversations are loading
- [ ] Query parameter is being passed

## 📊 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/messages` | Create conversation with initial message |
| GET | `/api/messages/conversations/:userId` | Get user's conversations |
| GET | `/api/messages/:conversationId` | Get conversation messages |

## 🎨 UI Components

### Accepted Request Card
```
┌─────────────────────────────────┐
│  👤 Provider Name               │
│  ✓ accepted                     │
│                                 │
│  📚 You offer: React.js         │
│  📖 You want: Node.js           │
│                                 │
│  💬 Their Response: "Great!"   │
│                                 │
│  [💬 Message] [📤 View Details]│
└─────────────────────────────────┘
```

### Details Dialog
```
┌────────────────────────────────────┐
│  Request Accepted! 🎉              │
│  Great news! MD JIHAD HOSSAIN has  │
│  accepted your request...          │
│                                    │
│  ┌──────────────────────────────┐ │
│  │ 🔄 Exchange Details          │ │
│  │ You're teaching: React.js    │ │
│  │ You're learning: Node.js     │ │
│  └──────────────────────────────┘ │
│                                    │
│  ┌──────────────────────────────┐ │
│  │ 💬 Their Response (Green)    │ │
│  │ "Great! Let's start..."      │ │
│  └──────────────────────────────┘ │
│                                    │
│  ┌──────────────────────────────┐ │
│  │ 📅 Next Steps (Blue)         │ │
│  │ • Start conversation         │ │
│  │ • Discuss goals              │ │
│  │ • Plan first session         │ │
│  └──────────────────────────────┘ │
│                                    │
│  [Close] [💬 Start Conversation]  │
└────────────────────────────────────┘
```

## 🔧 Common Issues

### Issue: "Unable to start conversation"
- **Cause**: User not logged in or provider ID missing
- **Fix**: Check session and request.skillProvider._id

### Issue: Conversation not appearing
- **Cause**: API failed or conversation not created
- **Fix**: Check network tab, verify API response

### Issue: Not auto-selecting conversation
- **Cause**: Query parameter missing or conversation doesn't exist
- **Fix**: Check URL, verify conversation in list

## 📱 Responsive Behavior

| Screen | Button Layout | Dialog Width |
|--------|--------------|--------------|
| Desktop | Side-by-side | 500px |
| Tablet | Side-by-side | 90vw |
| Mobile | Stacked | Full width |

## 🎯 Key Features

✅ Automatic conversation creation  
✅ Initial greeting message  
✅ Query parameter navigation  
✅ Auto-select conversation  
✅ Loading states  
✅ Error handling  
✅ Toast notifications  
✅ Enhanced dialog  
✅ Dual action buttons  
✅ Mobile responsive  

## 📝 Code Snippets

### Generate Conversation ID
```typescript
const generateConversationId = (userId1: string, userId2: string) => {
    return [userId1, userId2].sort().join("-");
};
```

### Initial Message Template
```typescript
const initialMessage = `Hi! I'm reaching out about our skill exchange - I'll teach you ${skillOffered} and learn ${skillRequested} from you. Let's discuss the details!`;
```

### Navigation with Query
```typescript
router.push(`/dashboard/messages?conversationId=${conversationId}`);
```

## 🔗 Related Documentation

- Full Implementation Guide: `FOLLOW_UP_MESSAGING_FEATURE.md`
- Component Architecture: `COMPONENT_ARCHITECTURE.md`
- API Documentation: Backend `/src/controllers/messageController.js`

---

**Last Updated**: January 9, 2025  
**Status**: ✅ Production Ready
