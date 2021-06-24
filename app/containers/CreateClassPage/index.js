/*
 * CreateClassPage
 *
 * Agenda
 * 1. Present the project
 * 2. How we can register inputs (Check repo)
 * 3. Controller patter using AntDesign component or custom one
 * 4. Explore Form context and consume context
 * 5. Access to any param using watch
 * 6. Watch: Validate input using current form state + reset any value
 * 7. Local error handler
 * 8. Extra ideas: Default model and handler class
 *
 * Testing https://react-hook-form.com/ + https://ant.design/components/switch/
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { Row, Col, Input, Alert } from 'antd';

import styled from 'styled-components';
import DatePicker from '../../components/DatePicker';
import TimePicker from '../../components/TimePicker';
import Select from '../../components/Select';
import TalentClass from './TalentClassModel';
import ZoomConfiguration from './ZoomConfiguration';
import 'antd/dist/antd.css';

const Container = styled.div`
  margin: 50px 0;
`;
export default function CreateClassPage({ talentClass }) {
  const model = new TalentClass(talentClass);

  const methods = useForm();
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const classMode = watch('classMode', model.getDefault('classMode'));
  useEffect(() => {
    if (classMode === 'free') setValue('price', 0);
    if (classMode !== 'flexible') {
      setValue('minimumPrice', 0);
      setValue(
        'flexibleMessage',
        'You can choose what you want to pay for this class.',
      );
    }
  }, [classMode]);

  const onSubmit = data => console.log(data);

  return (
    <Container>
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
                defaultValue={model.getDefault('title')}
                render={data => <Input {...data.field} />}
              />
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <label htmlFor="description">Description *</label>
              <Controller
                name="description"
                control={control}
                defaultValue={model.getDefault('description')}
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
                defaultValue={model.getDefault('instanceMode')}
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
              <label htmlFor="classDate">Date *</label>
              <Controller
                name="classDate"
                control={control}
                defaultValue={model.getDefault('classDate')}
                rules={{ required: true }}
                render={data => <DatePicker {...data} />}
              />
            </Col>
            <Col span={8}>
              <label htmlFor="startTime">Start Time *</label>
              <Controller
                name="startTime"
                control={control}
                defaultValue={model.getDefault('startTime')}
                rules={{ required: true }}
                render={data => <TimePicker {...data} />}
              />
            </Col>
            <Col span={8}>
              <label htmlFor="finishTime">End Time *</label>
              <Controller
                name="finishTime"
                control={control}
                defaultValue={model.getDefault('finishTime')}
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
                defaultValue={model.getDefault('classMode')}
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
                  defaultValue={model.getDefault('price')}
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
                      defaultValue={model.getDefault('minimumPrice')}
                      rules={{
                        min: 0,
                        max: watch('price', model.getDefault('price')),
                      }}
                      render={data => <Input {...data.field} />}
                    />
                  </Col>
                  <Col span={8}>
                    <label htmlFor="flexibleMessage">
                      Flexible price message *
                    </label>
                    <Controller
                      name="flexibleMessage"
                      control={control}
                      defaultValue={model.getDefault('flexibleMessage')}
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
                defaultValue={model.getDefault('maxParticipants')}
                rules={{ min: 0 }}
                render={data => <Input {...data.field} />}
              />
            </Col>
          </Row>

          {/* ZOOM HERE */}
          <ZoomConfiguration model={model} />

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
    </Container>
  );
}

CreateClassPage.propTypes = {
  talentClass: PropTypes.object,
};
