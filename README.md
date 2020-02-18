# post-to-tinjs
ServiceTIN สำหรับตรวจสอบเลขประจำตัวผู้เสียภาษีอากร (13 หลัก) ว่าถูกต้องและมีอยู่จริงในฐานข้อมูลหรือไม่

## Installation
```bash
npm install tin-id
```
## Usage
```typescript
import { CheckTaxID } from "tin-id"

const TAXID = "" //Tax Identification Number
const result = await CheckTaxID(TAXID)

```
## Reference
[reference](https://www.rd.go.th/publish/42533.0.html)
