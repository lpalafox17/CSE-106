
        
        var url = "https://amhep.pythonanywhere.com";

       function get()
        {
            let name = document.getElementById("name").value;
            let request = new XMLHttpRequest();
            let flag = false;
            request.open("GET", url + "/grades");
            request.send();
            request.onload = () =>
            {
                let data = JSON.parse(request.response);
                let keys = Object.keys(data);
                for (let i = 0; i < keys.length; i++)
                {
                    if(keys[i] == name)
                    {
                        document.getElementById("get_grade").value = data[keys[i]];
                        flag = true;
                    }
                }
                if(flag == false)
                {
                    document.getElementById("get_grade").value = "Name not found";
                }
            }
        }
        
        function find()
        {
            let request = new XMLHttpRequest();
            let text = "<table border='1'><tr><th>Name</th><th>Grade</th></tr>";
            request.open("GET", url + "/grades");
            request.send();
            request.onload = () =>
            {
                let data = JSON.parse(request.response);
                let keys = Object.keys(data);
                for (let i = 0; i < keys.length; i++)
                {
                    text += "<tr><td>" + keys[i] + "</td><td>" + data[keys[i]] + "</td></tr>";
                }
                text += "</table>";
                document.getElementById("get_all").innerHTML = text;
            }
        }
        
         function add()
        {
            let name = document.getElementById("addname").value;
            let grade = document.getElementById("addgrade").value;
            let param = 
            {
                "name": name,
                "grade": grade
            };
            let request = new XMLHttpRequest();
            request.open("POST", url + "/grades", true);
            request.setRequestHeader("Content-Type", "application/json");
            let json_data = JSON.stringify(param);
            request.send(json_data);
            document.getElementById("successrecord").innerHTML = "Student added!";
        }
        
        function edit()
        {
            let name = document.getElementById("editname").value;
            let grade = document.getElementById("editgrade").value;
            let param = 
            {
                "grade": grade
            };
            let request = new XMLHttpRequest();
            request.open("PUT", url + "/grades" + "/" + name, true);
            request.setRequestHeader("Content-Type", "application/json");
            let json_data = JSON.stringify(param);
            request.send(json_data);
            document.getElementById("successgrade").innerHTML = "Grade edited!";
        }
        function del()
        {
            let name = document.getElementById("deletename").value;
            let request = new XMLHttpRequest();
            request.open("DELETE", url + "/grades" + "/" + name, true);
            request.setRequestHeader("Content-Type", "application/json");
            request.send();
            document.getElementById("successdelete").innerHTML = "Student deleted";
        }
    