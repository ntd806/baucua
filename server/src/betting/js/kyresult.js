class KYResult {
    constructor(gameID, score, kyTypeRequirement) {
        this.gameID = gameID;
        this.score = score;
        this.type = kyTypeRequirement.calc(score);
    }

    send() {
        //var json = JSON.stringify(this);
        //console.log(json);
        //httpPost(CLIENT_URL, "json", json);
        var pathRequest = "../request_clear/" + this.gameID + "/" + this.type + "/";
        window.location.href = pathRequest;
    }
}

class KYTypeRequirement {
    constructor(point_1, point_2) {
        this.point_1 = point_1;
        this.point_2 = point_2;
    }

    TYPE_NAME_1 = "1";
    TYPE_NAME_2 = "2";
    TYPE_NAME_3 = "3";

    calc(score) {
        if (score <= this.point_1) {
            return this.TYPE_NAME_1;
        } else if (score > this.point_1 && score <= this.point_2) {
            return this.TYPE_NAME_2;
        } else if (score > this.point_2) {
            return this.TYPE_NAME_3;
        }
    }
}