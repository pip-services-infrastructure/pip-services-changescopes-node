# HTTP Protocol (version 1) <br/> Change Scopes Microservice

ChangeScopes microservice implements a HTTP compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [POST /change_scopes/get_scope_by_id](#operation1)
* [POST /change_scopes/change_scope](#operation2)
* [POST /change_scopes/change_scope_element](#operation3)
* [POST /change_scopes/delete_scope_by_id](#operation4)

## Operations

### <a name="operation1"></a> Method: 'POST', route '/change\_scopes/get\_section\_by_id'

Gets change scope by its unique id

**Request body:**
- id: string - unique scope id

**Response body:**
Change scope object

### <a name="operation2"></a> Method: 'POST', route '/change\_scopes/change\_scope'

Changes entire scope

**Request body:**
- id: string - unique scope id

**Response body:**
Updated change scope object

### <a name="operation3"></a> Method: 'POST', route '/change\_scopes/change\_scope\_element'

Changes specific scope element

**Request body:**
- id: string - unique scope id
- element: string - name of a scope element

**Response body:**
Updated change scope object

### <a name="operation4"></a> Method: 'POST', route '/change\_scopes/delete\_scope\_by\_id'

Deletes specified change scope

**Request body:**
- id: string - unique scope id

**Response body:**
Deleted change scope object

