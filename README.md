# 📝 Listy - Simple Checklist Application

A clean, modern, and fully functional checklist application built with vanilla HTML, CSS, and JavaScript. Listy allows you to create, edit, delete, and share checklist items with no authentication required.

## ✨ Features

- ✅ **Add Items**: Quickly add new checklist items using the input field or Enter key
- ✏️ **Edit Items**: Click "Edit" to modify any existing item inline
- 🗑️ **Delete Items**: Remove items with a simple click
- ☑️ **Mark Complete**: Check off items as completed with visual feedback
- 🔗 **Share Lists**: Generate shareable URLs that anyone can access
- 💾 **Auto-Save**: Automatically saves your list to browser localStorage
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🚀 **No Authentication**: Works entirely client-side, no sign-in required

## 🚀 Quick Start

Simply open `index.html` in your browser - it's completely self-contained with all styles and functionality embedded!

## 📁 Project Structure

```
listy
├── /v{n}/index.html          # Complete self-contained application
└── README.md           # This file
└── LICENSE           # MIT License
```

## 🎯 How to Use

### Adding Items
1. Type your item in the input field at the top
2. Click "Add" or press Enter
3. Your item appears in the list below

### Editing Items
1. Click the "Edit" button next to any item
2. Modify the text in the inline input field
3. Click "Save" or press Enter to confirm, or "Cancel" to abort

### Deleting Items
1. Click the "Delete" button next to any item
2. The item is immediately removed from your list

### Sharing Lists
1. Click "Share List" to generate a shareable URL
2. The link is automatically copied to your clipboard
3. Share it with anyone - they'll see your exact list and can edit it

### Managing Items
- ✅ Check the checkbox to mark items as complete
- 💾 Your list automatically saves to your browser
- 🔄 Your list loads automatically when you return

## 🛠️ Technical Details

### Built With
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with flexbox and gradients
- **Vanilla JavaScript**: No external libraries or frameworks
- **LocalStorage API**: Client-side data persistence
- **URL Encoding**: Shareable list links

### Browser Compatibility
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

### Storage
- Uses browser localStorage for data persistence
- No server required - everything runs locally
- Data stays private in your browser

## 🌐 Sharing

When you share a list:
- A URL with encoded list data is generated
- Recipients see exactly the same items with completion status
- They can edit, add, or delete items (changes only affect their view)
- No accounts or server storage required

## 📱 Mobile Support

Listy is fully responsive and works great on:
- 📱 Smartphones (iOS/Android)
- 📱 Tablets (iPad/Android tablets)
- 💻 Desktop computers
- 🖥️ Laptops

## 🔒 Privacy & Security

- **No Data Collection**: Your lists stay on your device
- **No Accounts**: No sign-up or login required
- **No Tracking**: Completely privacy-focused
- **Share Links**: Only contain list data, no personal information

## 🎨 Design Features

- **Modern Gradient Background**: Beautiful purple-blue gradient
- **Clean Card Design**: White card with subtle shadows
- **Smooth Animations**: Hover effects and transitions
- **Intuitive Interface**: Clear buttons and visual feedback
- **Accessible**: Proper focus states and keyboard navigation

## 🐛 Troubleshooting

### Items Not Saving?
- Ensure your browser supports localStorage
- Check if localStorage is enabled in your browser settings
- Try refreshing the page to reload saved data

### Sharing Not Working?
- Make sure your list has items before sharing
- Check if your browser supports clipboard API
- Copy the link manually if auto-copy fails

### Mobile Issues?
- Clear your browser cache and reload
- Ensure you're using a modern mobile browser
- Try using the app in a modern browser for better compatibility

## 🔄 Updates & Changes

The app automatically saves changes to localStorage. If you:
- **Edit items**: Changes are saved immediately
- **Delete items**: Removal is instant and permanent
- **Share lists**: Current state is encoded in the URL
- **Reload the page**: All your data restores automatically

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

Made with ♥ by knightlesssword

---

**Enjoy managing your lists with Listy! 🎉**
