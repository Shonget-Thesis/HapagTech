| # | Issue | Description | Impact |
|---|-------|-------------|--------|
| 1 | Typo in component filename | `CatergorySelector.tsx` has a typo ("Catergory" instead of "Category") | Low - Affects code readability and professionalism |
| 2 | Hardcoded item counts in CategorySelector | Item counts like '18 items' are hardcoded instead of being dynamic | Medium - Makes maintenance difficult when data changes |
| 3 | Missing comprehensive error handling in API calls | Some frontend API calls lack proper error handling | High - Can lead to poor user experience and debugging issues |
| 4 | Repeated product card logic | `ProductCard` contains duplicated button and event logic that should be abstracted | Medium - Increases maintenance and risks inconsistent behavior |
| 5 | Static category metadata | `CategorySelector` maps hardcoded images and ordering instead of using backend-driven metadata | Medium - Limits flexibility and makes category updates error-prone |
