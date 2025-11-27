
# Profile API Configuration

## 📍 Endpoint Configuration

**Three separate API endpoints** are configured for profile updates:

**File:** `src/layouts/dashboardLayout/user/pages/Profile.jsx`

**Current Endpoints (Line ~28-32):**

```javascript
const ENDPOINTS = {
  basicInfo: "/api/user/profile/basic-info",
  bankInfo: "/api/user/profile/bank-info",
  changePassword: "/api/user/profile/change-password",
};
```

## 🔧 How to Change Endpoints

1. Open **Profile.jsx** file
2. Find this object at Line ~28-32
3. Replace with your actual backend endpoints:

```javascript
const ENDPOINTS = {
  basicInfo: "/your-basic-info-endpoint",
  bankInfo: "/your-bank-info-endpoint",
  changePassword: "/your-password-endpoint",
};
```

## 📤 Data Sent to Each Endpoint

### 1. Basic Information Endpoint

**Method:** PUT
**Endpoint:** `/api/user/profile/basic-info`

**Request Body:**

```json
{
  "userName": "string",
  "level": "string",
  "joinDate": "string",
  "telegramId": "string",
  "timestamp": "ISO 8601 date string"
}
```

### 2. Bank Information Endpoint

**Method:** PUT
**Endpoint:** `/api/user/profile/bank-info`

**Request Body:**

```json
{
  "userName": "string",
  "accountNumber": "string",
  "accountHolderName": "string",
  "timestamp": "ISO 8601 date string"
}
```

### 3. Change Password Endpoint

**Method:** PUT
**Endpoint:** `/api/user/profile/change-password`

**Request Body:**

```json
{
  "newPassword": "string",
  "confirmPassword": "string",
  "timestamp": "ISO 8601 date string"
}
```

⚠️ **Note:** Password endpoint is called ONLY when user enters a new password. If password fields are empty, this API call is skipped.

## 🔐 Authentication

- Authorization token is automatically added via axios interceptor
- Token is stored in localStorage with key `authToken`
- Header format: `Bearer <token>`
- Same token is sent to all three endpoints

## 📝 Backend Requirements

Expected response format for each endpoint:

### Success Response (200 OK):

```json
{
  "success": true,
  "message": "Updated successfully",
  "data": { ... }
}
```

### Error Response (4xx/5xx):

```json
{
  "success": false,
  "message": "Error message here"
}
```

## 🎯 How It Works

1. When **Save Changes** button is clicked
2. Three API calls are made **simultaneously** (parallel):
   - Basic Info Update
   - Bank Info Update
   - Password Change (only if password is changed)
3. If all API calls succeed, success message is shown
4. If any call fails, error message is shown

## 🔄 After Updating Endpoints

No additional steps needed after changing endpoints. Just test directly.

## 🐛 Debugging

Detailed console logs will show:

```
╔════════════════════════════════════════════════════════════╗
║          PROFILE DATA - BEFORE API CALL                    ║
╚════════════════════════════════════════════════════════════╝

� 1. BASIC INFORMATION:
{ userName: "...", ... }

� 2. BANK INFORMATION:
{ userName: "...", ... }

� 3. PASSWORD CHANGE:
{ isPasswordChanged: true/false }

📦 COMPLETE DATA OBJECT:
{...}

============================================================
🚀 NOW SENDING TO API ENDPOINTS...
============================================================

📤 Calling Basic Info API...
📤 Calling Bank Info API...
⏭️  Password Change Skipped (no changes made)

✅ Basic Info API Success: {...}
✅ Bank Info API Success: {...}

============================================================
║                  ALL API RESULTS                           ║
============================================================

Results Summary:
1. basicInfo: ✅ Success
2. bankInfo: ✅ Success

Detailed Results:
[...]
============================================================
```

If errors occur:

```
❌ Basic Info API Failed: { ... }
❌ Bank Info API Failed: { ... }
❌ Password Change API Failed: { ... }
```

## ⚠️ Error Handling

- **401 Unauthorized** → Automatically redirects to login page
- **Network Error** → Error message shown for 5 seconds
- **Partial Success** → Shows which API calls failed
- **Success** → Success message shown for 3 seconds

## 📊 Console Output Features

✅ **Data shown BEFORE API calls**
✅ **Organized sections with box design**
✅ **Separate sections (Basic, Bank, Password)**
✅ **Complete data object shown together**
✅ **Real-time API call status**
✅ **Results summary in simple list format**
✅ **Detailed JSON results**
