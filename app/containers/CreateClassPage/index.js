/*
 * CreateClassPage
 *
 * Testing https://react-hook-form.com/ + https://ant.design/components/switch/
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { Row, Col, Input, Alert } from 'antd';

import DatePicker from '../../components/DatePicker';
import TimePicker from '../../components/TimePicker';
import Select from '../../components/Select';
import TextSwitch from '../../components/TextSwitch';

import 'antd/dist/antd.css';

export default function CreateClassPage() {
  const classData = {
    title: 'My form class',
    description: 'Let se how complicated ois use it',
    instanceMode: 'one-time',
    classDate: new Date(),
    startTime: new Date(),
    finishTime: new Date(),
    classMode: 'paid',
    price: 0,
    maxParticipants: 0,
    minimumPrice: 0,
    flexibleMessage: 'You can choose what you want to pay for this class.',
    classType: 'virtual',
    classUrlSource: 'user_provided',
    classUrl: '',
    classUrlPasscode: '',
  };

  const methods = useForm();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = methods;

  const onSubmit = data => console.log(data);

  const classMode = watch('classMode', classData.classMode);
  const classUrlSource = watch('classUrlSource', classData.classUrlSource);

  return (
    <div>
      <Helmet>
        <title>React hook form</title>
        <meta name="description" content="Test form in React.js using hooks" />
      </Helmet>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col span={24}>
              <label htmlFor="title">Title</label>
              <Controller
                name="title"
                control={control}
                defaultValue={classData.title}
                render={data => <Input {...data.field} />}
              />
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <label htmlFor="description">Description</label>
              <Controller
                name="description"
                control={control}
                defaultValue={classData.description}
                rules={{ required: true }}
                render={data => <Input {...data.field} />}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <label htmlFor="instanceMode">One-time or Recurring</label>
              <Controller
                name="instanceMode"
                control={control}
                defaultValue={classData.instanceMode}
                render={data => (
                  <Select
                    {...data}
                    options={[
                      { text: 'One-Time', value: 'one-time' },
                      { text: 'Recurring', value: 'recurring' },
                    ]}
                  />
                )}
              />
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <label htmlFor="classDate">Date</label>
              <Controller
                name="classDate"
                control={control}
                defaultValue={classData.classDate}
                rules={{ required: true }}
                render={data => <DatePicker {...data} />}
              />
            </Col>
            <Col span={8}>
              <label htmlFor="startTime">Start Time</label>
              <Controller
                name="startTime"
                control={control}
                defaultValue={classData.startTime}
                rules={{ required: true }}
                render={data => <TimePicker {...data} />}
              />
            </Col>
            <Col span={8}>
              <label htmlFor="finishTime">End Time</label>
              <Controller
                name="finishTime"
                control={control}
                defaultValue={classData.finishTime}
                rules={{ required: true }}
                render={data => <TimePicker {...data} />}
              />
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <label htmlFor="classMode">This class is</label>
              <Controller
                name="classMode"
                control={control}
                defaultValue={classData.classMode}
                render={data => (
                  <Select
                    {...data}
                    options={[
                      { text: 'Paid', value: 'paid' },
                      { text: 'Flexible', value: 'flexible' },
                      { text: 'Free', value: 'free' },
                    ]}
                  />
                )}
              />
            </Col>
          </Row>

          {classMode !== 'free' && (
            <Row>
              <Col span={8}>
                {classMode === 'paid' && <label htmlFor="price">Price</label>}
                {classMode === 'flexible' && (
                  <label htmlFor="price">Suggested Price</label>
                )}
                <Controller
                  name="price"
                  control={control}
                  defaultValue={classData.price}
                  rules={{ min: 0 }}
                  render={data => <Input {...data.field} />}
                />
              </Col>

              {classMode === 'flexible' && (
                <React.Fragment>
                  <Col span={8}>
                    <label htmlFor="minimumPrice">Minimum Price</label>
                    <Controller
                      name="minimumPrice"
                      control={control}
                      defaultValue={classData.minimumPrice}
                      rules={{ min: 0, max: watch('price', classData.price) }}
                      render={data => <Input {...data.field} />}
                    />
                  </Col>
                  <Col span={8}>
                    <label htmlFor="flexibleMessage">
                      Flexible price message
                    </label>
                    <Controller
                      name="flexibleMessage"
                      control={control}
                      defaultValue={classData.flexibleMessage}
                      rules={{
                        required: true,
                      }}
                      render={data => <Input {...data.field} />}
                    />
                  </Col>
                </React.Fragment>
              )}
            </Row>
          )}

          <Row>
            <Col span={8}>
              <label htmlFor="maxParticipants">Max participants</label>
              <Controller
                name="maxParticipants"
                control={control}
                defaultValue={classData.maxParticipants}
                rules={{ min: 0 }}
                render={data => <Input {...data.field} />}
              />
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <div>
                <label htmlFor="classType">Virtual Class</label>
              </div>
              <Controller
                name="classType"
                control={control}
                defaultValue={classData.classType}
                render={data => (
                  <TextSwitch
                    {...data}
                    trueValue="virtual"
                    falseValue="face_to_face"
                  />
                )}
              />
            </Col>
            <Col span={8}>
              <label htmlFor="classUrlSource">Select a video option: </label>
              <Controller
                name="classUrlSource"
                control={control}
                defaultValue={classData.classUrlSource}
                render={data => (
                  <Select
                    {...data}
                    options={[
                      {
                        text:
                          'I’ll use my own video service (i.e. Zoom account)',
                        value: 'user_provided',
                      },
                      {
                        text: 'I`ll use my own integrated zoom account',
                        value: 'zoom_integrated',
                      },
                    ]}
                  />
                )}
              />
            </Col>
            {classUrlSource === 'user_provided' && (
              <Col span={8}>
                <div>
                  <label htmlFor="classUrl">
                    Link to class stream (i.e. Zoom)
                  </label>
                  <Controller
                    name="classUrl"
                    control={control}
                    defaultValue={classData.classUrl}
                    render={data => <Input {...data.field} />}
                  />
                </div>
                <div>
                  <label htmlFor="classUrlPasscode">
                    Passcode (for Zoom meetings)
                  </label>
                  <Controller
                    name="classUrlPasscode"
                    control={control}
                    defaultValue={classData.classUrlPasscode}
                    render={data => <Input {...data.field} />}
                  />
                </div>
              </Col>
            )}
          </Row>

          <div>
            {Object.keys(errors).map(key => (
              <Alert
                key={key}
                message={`${key}: ${errors[key].type}`}
                type="error"
              />
            ))}
          </div>

          <input type="submit" />
        </form>
      </FormProvider>
    </div>
  );
}
