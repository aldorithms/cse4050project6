import User from "../../schema/user.cjs"

export const register = async (request, response) => {
    const user_name = request.body.user_name;
    const password = request.body.password;
    const password2 = request.body.password2;

    console.log(user_name);

    const user = await User.findOne({ user_name: user_name });
    if (user) {
        response.status(400).send("Another user exist with this username");
    }

    if (password == password2) {
        User.create({ user_name: user_name, password: password });
        response.sendStatus(200);
    }
    else {
        response.status(400).send("wrong password");
    }
}

export const login = async (request, response) => {
    const user_name = request.body.user_name;
    const password = request.body.password;

    const user = await User.findOne({ user_name });
    console.log(user.user_name);
    if (user.password !== password) {
        response.status(400).send("Wrong password");

    }
    else {
        request.session.regenerate(() => {
            request.session.user = user._id; request.session.cookie.originalMaxAge = 3600000; // 1 hr
            request.session.cookie.reSave = true;

            request.session.save(() => {
                response.send(user);
            });
        });
    }
};
