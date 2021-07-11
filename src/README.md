**Rest services**

REST services that support parental control application

**Parent Model (RDB)**
|  Field | Type  |
|---|---|
|  id | Integer  |
|  email | String(50)  |
|  password | String(255)  |
|  full_name | String(255)  |
|  phone_number | String(50)  |
|  address | String(255)  |

**Child Model (RDB)**
|  Field | Type  |
|---|---|
|  id | Integer  |
|  parent_id | Integer  |
|  email | String(50)  |
|  password | String(255)  |
|  name | String(255)  |
|  phone_number | String(50)  |


**Device Model (RDB)**
|  Field | Type  |
|---|---| 
|  id | Integer  |
|  child_id | Integer  |
|  type | Tinyint  |
|  last_known_position | Point  |
|  device_locked | Boolean  |
|  device_policy_id | String(50)  |


