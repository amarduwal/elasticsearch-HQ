/*
 Copyright 2013 Roy Russo

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 Latest Builds: https://github.com/royrusso/elasticsearch-HQ
 */
var chart = {
    addData:function (data, primeXY, newXY) {
        if (data == undefined) {
            data = [primeXY]
        }
        else {
            if (data.length > 5) {
                data.shift(); // remove first item
            }
        }
        return data;

        data.push(newXY);
        return data;
    },
    draw:function (id, data, options) {
        return $.plot($(id), [
            {data:data, lines:{ show:true, fill:true, fillColor:"#C3C3C3", lineWidth:3}, curvedLines:{apply:true}}
        ], options);
    }
}

chart.ts_xaxis =
{
    mode:"time", localTimezone:true, timeformat:"%h:%M:%S",
    tickFormatter:function (v, axis) {
        var date = new Date(v);

        if (date.getSeconds() % 10 == 0) {
            var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

            return hours + ":" + minutes + ":" + seconds;
        } else {
            return "";
        }
    }
}

chart.jvmHeap = {
    options:function () {
        return {
            series:{
                curvedLines:{
                    active:true
                },
                color:"GREEN"
            },
            grid:{
                show:true,
                backgroundColor:{ colors:[ "#fff", "#eee" ] },
                borderWidth:1,
                borderColor:'#CCCCCC'
            },
            xaxis:chart.ts_xaxis,
            yaxis:{
                tickSize:50
            }
        }
    }
};
