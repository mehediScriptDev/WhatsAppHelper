# Status Cards API Endpoints Configuration

## প্রতিটা Status Card এর জন্য আলাদা আলাদা Endpoint

### 1. WhatsApp Active Count

**Type:** `whatsapp-active`  
**Endpoint:** `GET /api/whatsapp/active-count`  
**Response:**

```json
{
  "success": true,
  "data": {
    "count": 6
  }
}
```

---

### 2. WhatsApp Disconnected Count

**Type:** `whatsapp-disconnected`  
**Endpoint:** `GET /api/whatsapp/disconnected-count`  
**Response:**

```json
{
  "success": true,
  "data": {
    "count": 2
  }
}
```

---

### 3. Today's Blast Count

**Type:** `todays-blast`  
**Endpoint:** `GET /api/blast/today-count`  
**Response:**

```json
{
  "success": true,
  "data": {
    "count": 150
  }
}
```

---

### 4. Total Earnings (Already exists) ✅

**Type:** `total-earnings` or `todays-earning`  
**Endpoint:** `GET /api/referrals/my-earnings`  
**Response:**

```json
{
  "success": true,
  "data": {
    "balanceCents": 50000,
    "transactions": []
  }
}
```

---

### 5. Today's Reward

**Type:** `todays-reward`  
**Endpoint:** `GET /api/rewards/today`  
**Response:**

```json
{
  "success": true,
  "data": {
    "amount": 1200
  }
}
```

---

### 6. Total Messages Count

**Type:** `total-messages`  
**Endpoint:** `GET /api/messages/total-count`  
**Response:**

```json
{
  "success": true,
  "data": {
    "count": 5000
  }
}
```

---

## Summary Table

| Type                    | Title                 | Endpoint                         | Response Key | Status |
| ----------------------- | --------------------- | -------------------------------- | ------------ | ------ |
| `whatsapp-active`       | WHATSAPP ACTIVE       | /api/whatsapp/active-count       | count        | ⏳     |
| `whatsapp-disconnected` | WHATSAPP DISCONNECTED | /api/whatsapp/disconnected-count | count        | ⏳     |
| `todays-blast`          | TODAY'S BLAST         | /api/blast/today-count           | count        | ⏳     |
| `total-earnings`        | TOTAL EARNINGS        | /api/referrals/my-earnings       | balanceCents | ✅     |
| `todays-earning`        | TODAY'S EARNING       | /api/referrals/my-earnings       | balanceCents | ✅     |
| `todays-reward`         | TODAY'S REWARD        | /api/rewards/today               | amount       | ⏳     |
| `total-messages`        | TOTAL MESSAGES        | /api/messages/total-count        | count        | ⏳     |

---

## How to Add/Update Endpoints

StatusCard component এ `ENDPOINT_CONFIG` object update করুন:

```javascript
const ENDPOINT_CONFIG = {
  "your-type": {
    endpoint: "/api/your/endpoint",
    dataKey: "fieldName",
    nestedData: true, // যদি response.data.data.fieldName হয়
  },
};
```

## Usage in Pages

```jsx
<StatusCard
  type="whatsapp-active"
  title="WHATSAPP ACTIVE"
  icon={FaWhatsapp}
  bgGradient="from-[#2AC78F] to-[#12A777]"
/>
```

---

## Notes:

- ✅ = Already implemented
- ⏳ = Need to implement
- সব endpoints এ Token authentication লাগবে
- Error হলে 0 display হবে
- Data না থাকলে 0 return করবেন
